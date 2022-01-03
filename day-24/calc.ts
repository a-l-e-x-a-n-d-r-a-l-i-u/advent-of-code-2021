import { DatabaseHandler } from './database.js'
import { ForkingAlu } from './ForkingAlu.js'
import { loadInput } from './load.js'

const TIMER_LABEL = 'thousand batches'
const input = loadInput()
const baseAlu = new ForkingAlu(input)
const database = new DatabaseHandler(baseAlu)
if (!database.isInitilised()) {
  database.push(baseAlu)
}
database.fixLostRecords()
let aluBatch = database.popBatch()
let batches = 0
console.time(TIMER_LABEL)
while (aluBatch.length > 0) {
  const alusToSave: ForkingAlu[] = []
  for (const alu of aluBatch) {
    const nextAlus = alu.runUntilFork()
    if (nextAlus == null) {
      alusToSave.push(alu)
    } else {
      alusToSave.push(...nextAlus)
    }
  }
  database.finishBatch(aluBatch, alusToSave)
  aluBatch = database.popBatch()
  batches += 1
  if (batches % 1000 === 0) {
    console.log('percent', database.getPercentageComplete())
    console.timeEnd(TIMER_LABEL)
    console.time(TIMER_LABEL)
  }
}
