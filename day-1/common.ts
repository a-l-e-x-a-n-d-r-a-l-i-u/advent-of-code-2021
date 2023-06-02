import { readFileSync } from 'fs'

//Cleaning the data
export function loadInput(): number[] {
  return readFileSync('input', { encoding: 'utf-8' })
    .split('\n')
    .map((line: string) => line.trim())
    .filter((line: string) => line.length > 0)
    .map(Number)
}

//Comparing numbers
export function compareNumbers(list: number[]): number[] {
  const result: number[] = [];

  for (let i = 1; i < list.length; i++) {
    const comparison: number = list[i] > list [i-1] ? 1 : 0;
    result.push(comparison)
  }
  return result
}