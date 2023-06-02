import { compareDepths, loadInput } from './common.js'

function getSumTotal(arr: number[]): number {
  return arr.reduce((accumulator, currentNumber) => accumulator + currentNumber, 0);
}

const allLines = loadInput()
const comparisonResult: number[] = compareDepths(allLines)
const totalIncreases: number = getSumTotal(comparisonResult)

console.log('total increases:', totalIncreases)
