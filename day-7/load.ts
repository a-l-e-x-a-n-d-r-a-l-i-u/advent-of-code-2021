import { readFileSync } from 'fs'

export function loadInput(): number[] {
  return readFileSync('test', { encoding: 'utf-8' }).split(',').map(Number)
}
