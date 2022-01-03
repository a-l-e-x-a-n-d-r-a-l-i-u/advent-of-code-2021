import { isList, List } from 'immutable'
import { RawInstruction } from './load.js'

export type Variable = 'w' | 'x' | 'y' | 'z'
export type InstructionOperation = 'inp' | 'add' | 'mul' | 'div' | 'mod' | 'eql'

export class Alu {
  w = 0

  x = 0

  y = 0

  z = 0

  input: number[] = []

  inputCursor = 0

  protected instructions: List<() => void>

  constructor(instructions: List<RawInstruction> | Alu) {
    if (isList(instructions)) {
      this.instructions = instructions.map((instruction) => {
        if (instruction.instruction === 'inp') {
          return function inp(this: Alu) {
            this[instruction.first] = this.getNextInput()
          }
        }
        if (instruction.instruction === 'add') {
          return function add(this: Alu) {
            const secondOperator =
              typeof instruction.second === 'number' ? instruction.second : this[instruction.second]
            this[instruction.first] += secondOperator
          }
        }
        if (instruction.instruction === 'mul') {
          return function mul(this: Alu) {
            const secondOperator =
              typeof instruction.second === 'number' ? instruction.second : this[instruction.second]
            this[instruction.first] *= secondOperator
          }
        }
        if (instruction.instruction === 'div') {
          return function div(this: Alu) {
            const secondOperator =
              typeof instruction.second === 'number' ? instruction.second : this[instruction.second]
            this[instruction.first] = Math.floor(this[instruction.first] / secondOperator)
          }
        }
        if (instruction.instruction === 'mod') {
          return function mod(this: Alu) {
            const secondOperator =
              typeof instruction.second === 'number' ? instruction.second : this[instruction.second]
            this[instruction.first] %= secondOperator
          }
        }
        if (instruction.instruction === 'eql') {
          return function eql(this: Alu) {
            const secondOperator =
              typeof instruction.second === 'number' ? instruction.second : this[instruction.second]
            this[instruction.first] = this[instruction.first] === secondOperator ? 1 : 0
          }
        }
        throw new Error(`invalid operation ${instruction.instruction as string}`)
      })
    } else {
      this.instructions = instructions.instructions
    }
  }

  public run(input: number[] | null = null): number {
    if (input != null) {
      this.input = input
      this.inputCursor = 0
      this.w = 0
      this.x = 0
      this.y = 0
      this.z = 0
    }
    for (const operation of this.instructions) {
      operation.bind(this)()
    }
    return this.z
  }

  protected getNextInput(): number {
    const result = this.input[this.inputCursor]
    this.inputCursor += 1
    return result
  }
}
