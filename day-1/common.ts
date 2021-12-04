import { readFileSync } from 'fs'

export function loadInput(): number[] {
  return readFileSync('input', { encoding: 'utf-8' })
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map(Number)
}

export function countIncreases(list: number[]): number {
  let totalIncreases = 0
  for (const [index, currentLine] of list.entries()) {
    if (index !== 0) {
      const previousLine = list[index - 1]
      if (currentLine > previousLine) {
        totalIncreases += 1
      }
    }
  }
  return totalIncreases
}
