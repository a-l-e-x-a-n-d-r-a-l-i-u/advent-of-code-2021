import { readFileSync } from 'fs'
import { List, Seq } from 'immutable'
import { InstructionOperation, Variable } from './Alu'

export interface RawInstruction {
  instruction: InstructionOperation
  first: Variable
  second: Variable | number
}
export function loadInput(file = 'input'): List<RawInstruction> {
  return Seq(readFileSync(file, { encoding: 'utf-8' }).split('\n'))
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const parts = line.split(' ')
      const secondAsNumber = Number(parts[2])
      return {
        instruction: parts[0] as InstructionOperation,
        first: parts[1] as Variable,
        second: Number.isNaN(secondAsNumber) ? (parts[2] as Variable) : secondAsNumber,
      }
    })
    .toList()
}
