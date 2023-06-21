import { loadInput } from './common.js'

const dataset: string[] = loadInput()

function filterByCommonDigits(array: string[], findMax: boolean): string[] {
  let criteria = "";
  let filteredArray = array.filter((str) => str.startsWith(criteria))

  while (filteredArray.length > 1) {
    const count: number[] = [0, 0]; // Count of 0s and 1s at each digit position
    for (const element of array) {
      count[parseInt(element)]++; // Increment count at current digit position
    }

    const targetDigit: number = count[0] > count[1] ? 0 : 1;
    criteria += findMax ? targetDigit.toString() : (targetDigit === 0 ? "1" : "0");
    
    filteredArray = filteredArray.filter((str) => str.startsWith(criteria));
  }

  return filteredArray;
}

const oxygenBinary = filterByCommonDigits(dataset, true)
const co2Binary = filterByCommonDigits(dataset, false)

// Parse the binary numbers into integers
const oxygenResult = parseInt(oxygenBinary.join(""), 2)
const co2Result = parseInt(co2Binary.join(""), 2)

console.log('oxygen:', oxygenResult)
console.log('co2:', co2Result)

const powerConsumptionRating = oxygenResult * co2Result
console.log('power:', powerConsumptionRating)