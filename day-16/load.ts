import { readFileSync } from 'fs'

export function loadInput(file = 'input'): Buffer {
  return Buffer.from(readFileSync(file, { encoding: 'utf-8' }).trim(), 'hex')
}
