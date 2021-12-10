import { readFileSync } from 'fs'

export type Char = '[' | ']' | '(' | ')' | '{' | '}' | '<' | '>'
export function loadInput(): Char[][] {
  return readFileSync('input', { encoding: 'utf-8' })
    .split('\n')
    .map((line) => line.trim().split('') as Char[])
}
