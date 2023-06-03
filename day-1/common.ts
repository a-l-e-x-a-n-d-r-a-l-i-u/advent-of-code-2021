import { readFileSync } from 'fs'

//Cleaning the data
const cleanInput: number[] = readFileSync('input', { encoding: 'utf-8' })
    .split('\n')
    .map((line: string) => line.trim())
    .filter((line: string) => line.length > 0)
    .map(Number)

//Callback function to get the sum total
function getSumTotal(arr: number[]): number {
  return arr.reduce((accumulator, currentNumber) => accumulator + currentNumber, 0);
}


// Compare values based on a given condition
function compareValues(arr: number[], startIndex: number, condition: (arr: number[], i: number) => boolean): number[] {
  const result: number[] = [];

  for (let i = startIndex; i < arr.length; i++) {
    const comparison: number = condition(arr, i) ? 1 : 0;
    result.push(comparison);
  }

  return result;
}

// Part 1 - Comparing depths
//  f(x) = {arr[x] > arr[x-1]:1,0}
//  with starting index at 1
const depthComparisonResult: number[] = compareValues(cleanInput, 1, (arr, i) => arr[i] > arr[i - 1]);
console.log('Part 1: Total increases (depth):', getSumTotal(depthComparisonResult));

// Part 2 - Comparing windows
//  f(x) = {arr[x-1] + arr[x] + arr[x+1] > arr[x-2] + arr[x-1] + arr[x]:1,0}
//  f(x) = {arr[x+1] > arr[x-2]:1,0}
//  with starting index at 2
const windowComparisonResult: number[] = compareValues(cleanInput, 2, (arr, i) => arr[i + 1] > arr[i - 2]);
console.log('Part 2: Total increases (window):', getSumTotal(windowComparisonResult));