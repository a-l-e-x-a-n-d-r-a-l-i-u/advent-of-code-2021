import { readFileSync } from 'fs'

export function loadInput(): number[] {
  return readFileSync('input', { encoding: 'utf-8' }).split(',').map(Number)
}
