import { readFileSync } from 'fs'

//Cleaning the data
const cleanInput: number[] = readFileSync('input', { encoding: 'utf-8' })
    .split('\n')
    .map((line: string) => line.trim())
    .filter((line: string) => line.length > 0)
    .map(Number)

//Comparing depths
function compareDepths(arr: number[]): number[] {
  const result: number[] = [];

  for (let i = 1; i < arr.length; i++) {
    const comparison: number = arr[i] > arr[i-1] ? 1 : 0;
    result.push(comparison)
  }
  return result
}

//Comparing windows
function compareWindows(arr: number[]): number[] {
  const result: number[] = [];

  for (let i = 2; i < arr.length; i++) {
    const comparison: number = arr[i-1]+arr[i]+arr[i+1] > arr[i-2]+arr[i-1]+arr[i] ? 1 : 0;
    result.push(comparison)
  }
  return result
}

//Callback
function getSumTotal(arr: number[]): number {
  return arr.reduce((accumulator, currentNumber) => accumulator + currentNumber, 0);
}

//Results
const depthComparisonResult: number[] = compareDepths(cleanInput)
const windowComparisonResult: number[] = compareWindows(cleanInput)

console.log('part 1: total increases:', getSumTotal(depthComparisonResult))
console.log('part 2: total increases:', getSumTotal(windowComparisonResult))
