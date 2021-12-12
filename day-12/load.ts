import { readFileSync } from 'fs'

export type Link = readonly [string, string]
export function loadInput(): Link[] {
  return readFileSync('input', { encoding: 'utf-8' })
    .split('\n')
    .filter((line) => line.length > 0)
    .map((line) => {
      const parts = line.trim().split('-')
      if (parts.length !== 2) {
        throw new Error('invalid input')
      }
      return parts as unknown as Link
    })
}
