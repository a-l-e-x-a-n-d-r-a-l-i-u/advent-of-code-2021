import { readFileSync } from 'fs'

export function loadInput(): number[][] {
  return readFileSync('input', { encoding: 'utf-8' })
    .split('\n')
    .map((line) => line.trim().split('').map(Number))
    .filter((line) => line.length > 0)
}
