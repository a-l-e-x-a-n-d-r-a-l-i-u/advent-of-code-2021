import { readFileSync } from 'fs'

export function loadInput(): number[][] {
  return readFileSync('input', { encoding: 'utf-8' })
    .split('\n')
    .filter((line, array) => line.length === array[0].length) // The map should be rectangular
    .map((line) => line.trim().split('').map(Number))
}
