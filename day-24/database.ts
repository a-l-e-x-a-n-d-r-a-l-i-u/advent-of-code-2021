import Database from 'better-sqlite3'
import { Repeat } from 'immutable'
import { ForkingAlu } from './ForkingAlu.js'

interface RawState {
  w: number
  z: number
  smallestInput: number
  largestInput: number
  instruction: number
  rowid: number
}

export class DatabaseHandler {
  private db: Database.Database

  private getBatchStatement: Database.Statement<[]>

  private insertStateStatement: Database.Statement<{
    w: number
    z: number
    instruction: number
    smallestInput: number
    largestInput: number
    finished: number
  }>

  private countPercentStatement: Database.Statement<[]>

  private finaliseStatementCache = new Map<number, Database.Statement<number[]>>()

  public readonly finishBatch: (finalizedAlus: ForkingAlu[], newAlus: ForkingAlu[]) => void

  constructor(private baseAlu: ForkingAlu) {
    this.db = new Database('states.db', { timeout: 20000 })
    this.db.pragma('journal_mode = WAL')
    this.db.pragma('synchronous = OFF')
    this.db.pragma('locking_mode = NORMAL')
    this.db
      .prepare(
        `CREATE TABLE IF NOT EXISTS states(
          w INTEGER NOT NULL,
          z INTEGER NOT NULL,
          instruction INTEGER NOT NULL,
          smallestInput INTEGER DEFAULT 0,
          largestInput INTEGER DEFAULT 0,
          calculating BOOLEAN DEFAULT FALSE,
          forked BOOLEAN DEFAULT FALSE,
          PRIMARY KEY(w, z, instruction))`,
      )
      .run()
    this.db.prepare(`CREATE INDEX IF NOT EXISTS states_calculating on states(calculating)`).run()
    this.getBatchStatement = this.db.prepare(
      'update states set calculating = true WHERE calculating = false RETURNING rowid, * LIMIT 100',
    )
    this.insertStateStatement = this.db.prepare(
      `insert into states(w, z, instruction, smallestInput, largestInput, calculating, forked)
      values (@w, @z, @instruction, @smallestInput, @largestInput, @finished, @finished)
      ON CONFLICT(w, z, instruction) DO UPDATE SET
      largestInput = MAX(states.largestInput, excluded.largestInput),
      smallestInput = MIN(states.smallestInput, excluded.smallestInput)`,
    )
    this.countPercentStatement = this.db
      .prepare(`select 1.0 * count(*) / (select count(*) from states) from states where calculating = true`)
      .pluck()

    this.finishBatch = this.db.transaction((finalizedAlus: ForkingAlu[], newAlus: ForkingAlu[]) => {
      const finalise = this.getFinaliseStatementForCount(finalizedAlus.length)
      finalise.run(...finalizedAlus.map((alu) => alu.rowId))
      for (const alu of newAlus) {
        this.push(alu)
      }
    })
  }

  public popBatch(): ForkingAlu[] {
    const result = this.getBatchStatement.all() as RawState[]
    return result.map((raw) => this.rawToAlu(raw))
  }

  public push(alu: ForkingAlu): void {
    this.insertStateStatement.run({
      w: alu.w,
      z: alu.z,
      instruction: alu.instructionCursor,
      smallestInput: alu.smallestInput,
      largestInput: alu.largestInput,
      finished: alu.finishedCalculating ? 1 : 0,
    })
  }

  private rawToAlu(state: RawState): ForkingAlu {
    return new ForkingAlu(
      this.baseAlu,
      state.w,
      state.z,
      state.instruction,
      state.smallestInput,
      state.largestInput,
      state.rowid,
    )
  }

  private getFinaliseStatementForCount(count: number): Database.Statement<number[]> {
    let result = this.finaliseStatementCache.get(count)
    if (!result) {
      result = this.db.prepare<number[]>(
        `update states set forked = true WHERE rowid in (${Repeat('?', count).join(',')})`,
      )
      this.finaliseStatementCache.set(count, result)
    }
    return result
  }

  public isInitilised(): boolean {
    return this.db.prepare<[]>('select count(*) from states').pluck().get() !== 0
  }

  public fixLostRecords(): void {
    this.db.prepare<[]>('update states set calculating = false where calculating = true and forked = false').run()
  }

  public getPercentageComplete(): number {
    return this.countPercentStatement.get()
  }

  public getHighestValidAnswer(): number {
    return this.db
      .prepare(
        'select max(largestInput) from states where instruction = (select max(instruction) from states) and z = 0',
      )
      .pluck()
      .get()
  }

  public getLowestValidAnswer(): number {
    return this.db
      .prepare(
        'select min(smallestInput) from states where instruction = (select max(instruction) from states) and z = 0',
      )
      .pluck()
      .get()
  }
}
