import { loadInput } from './common.js'

const dataset: string[] = loadInput()

function rotateArray(array: string[]): string[] {
  const columns = array[0].length;
  const rotatedWorkingArray = Array.from({ length: columns }, ((_, i) => array.map(string => string[i]))); // Rotates elements, but the result is an array of arrays of individual characters
  const rotatedArray = rotatedWorkingArray.map(column => column.join('')) // Combines the split characters into a cohesive string
  return rotatedArray;
}

function countDigitOccurences(array: string[], findMax: boolean) { 
  const count: number[] = [0, 0]; // Count of 0s and 1s at each digit position
  for (const element of array) {
    count[parseInt(element)]++; // Increment count at current digit position
  }
  const result: string = findMax ? (count[0] > count[1] ? 0 : 1) : (count[0] < count[1] ? 0 : 1)
  return result
}

function filterByCommonDigits(array: string[], findMax: boolean): string[] {
  const criteria = "";
  const filteredArray = array.filter((str) => str.startsWith(criteria))

  while filteredArray.length > 1 {
    for (let i = 0; i < array[0].length; i++) {
      const rotatedArray = rotateArray(filteredArray);
      const nextDigitInCriteria = countDigitOccurences(rotatedArray, findMax);
      criteria.concat(nextDigitInCriteria)

    }
  }

  return filteredArray;
}

  let rotatedArray = rotatedArray(array);
  let filteredArray = array.filter
  let criteria = "a".concat("b");

  for (const line of rotatedArray) {
    count[parseInt(line[i])]++; // Increment count at current digit position
  }



  const lastDigit = array[0].length - 1

  let i = 0;
  while (array.length > 1 && i <= lastDigit) {
//  while (array.length > 0) {
    const count: number[] = [0, 0]; // Count of 0s and 1s at each digit position

    for (const line of array) {
      count[parseInt(line[i])]++; // Increment count at current digit position
    }

    const targetFrequency = findMax ? Math.max(...count) : Math.min(...count)
    const targetDigit = count.indexOf(targetFrequency)

    array = array.filter((line) => parseInt(line[i]) === targetDigit)

    if (array.length === 2) {
      array.sort((a, b) => {
        const comparison = parseInt(a[lastDigit]) - parseInt(b[lastDigit]);
        return findMax ? comparison : -comparison;
      });
    }

    i++;
  }

  return array[0]
}

filterByCommonDigits(dataset, true)





const allLines = readFileSync('input', { encoding: 'utf-8' })
  .split('\n')
  .filter((line, _, array) => line.length === array[0].length)
function filterToSignificantBits(lines: string[], most: boolean, index: number): string[] {
  const count = lines.reduce((total, currentLine) => (currentLine[index] === '1' ? total + 1 : total), 0)
  let wantedBit: '1' | '0'
  if (count >= lines.length / 2) {
    wantedBit = most ? '1' : '0'
  } else {
    wantedBit = most ? '0' : '1'
  }
  return lines.filter((line) => line[index] === wantedBit)
}

function filterToOneResult(most: boolean): string {
  let potentialLines = allLines
  let i = 0
  while (potentialLines.length > 1) {
    potentialLines = filterToSignificantBits(potentialLines, most, i)
    i += 1