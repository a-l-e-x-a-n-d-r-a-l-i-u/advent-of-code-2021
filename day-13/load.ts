import { readFileSync } from 'fs'

export interface Point {
  x: number
  y: number
}
export interface FoldInstruction {
  axis: 'x' | 'y'
  line: number
}
export interface FoldInput {
  dots: Point[]
  folds: FoldInstruction[]
}
const FOLD_PREFIX = 'fold along '
export function loadInput(): FoldInput {
  const inputContents = readFileSync('input', { encoding: 'utf-8' })

  const instructionDoubleBreak = inputContents.indexOf('\n\n')
  if (instructionDoubleBreak < 0) {
    throw new Error('could not parse input')
  }
  const dots: Point[] = inputContents
    .slice(0, instructionDoubleBreak)
    .split('\n')
    .filter((line) => line.length > 0)
    .map((point) => point.trim().split(',').map(Number))
    .map((point) => {
      if (point.length !== 2) {
        throw new Error('invalid dot input')
      }
      return {
        x: point[0],
        y: point[1],
      }
    })

  const folds: FoldInstruction[] = inputContents
    .slice(instructionDoubleBreak)
    .split('\n')
    .filter((line) => line.length > 0)
    .map((line) => {
      if (!line.startsWith(FOLD_PREFIX)) {
        throw new Error('not a valid fold instruction')
      }
      const realInstruction = line.slice(FOLD_PREFIX.length)
      const realInstructionParts = realInstruction.split('=')
      if (realInstructionParts.length !== 2) {
        throw new Error('not a valid fold instruction')
      }
      if (realInstructionParts[0] !== 'x' && realInstructionParts[0] !== 'y') {
        throw new Error('fold intruction not along a valid axis')
      }
      return {
        axis: realInstructionParts[0],
        line: Number(realInstructionParts[1]),
      }
    })
  return {
    dots,
    folds,
  }
}
