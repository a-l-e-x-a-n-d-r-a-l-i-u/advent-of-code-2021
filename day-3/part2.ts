import { loadInput } from './common.js'

const dataset: string[] = loadInput()



function filterByCommonDigits(array: string[], most: boolean): string {

  let potentialLines = array;
  let i = 0;

  while (potentialLines.length > 1) {
    const countOfZeros: number = potentialLines.reduce((total, currentLine) => (currentLine[i] === '0' ? total + 1 : total), 0)
    const countOfOnes: number = potentialLines.reduce((total, currentLine) => (currentLine[i] === '1' ? total + 1 : total), 0)

    const criterion: '0' | '1' = most ? ( countOfZeros > countOfOnes ? '0' : '1' ) : ( countOfOnes < countOfZeros ? '1' : '0' )
    potentialLines = potentialLines.filter((line) => line[i] === criterion)
    // console.log(i, potentialLines)
    i++
  }

  if (potentialLines.length === 1) {
    console.log(potentialLines[0]);
  }

  return potentialLines[0];
}

const oxygenBinary = filterByCommonDigits(dataset, true)
const co2Binary = filterByCommonDigits(dataset, false)
console.log('oxygen:', oxygenBinary)
console.log('co2:', co2Binary)

// Parse the binary numbers into integers
const oxygenResult = parseInt(oxygenBinary, 2)
const co2Result = parseInt(co2Binary, 2)

console.log('oxygen:', oxygenResult)
console.log('co2:', co2Result)

const powerConsumptionRating = oxygenResult * co2Result
console.log('power:', powerConsumptionRating)