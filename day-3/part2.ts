import { loadInput } from './common.js'

const dataset: string[] = loadInput()

function filterByCommonDigits(array: string[], findMax: boolean) {
  const lastDigit = array[0].length - 1;

  let i = 0;
  while (array.length > 0) {
    const count: number[] = [0, 0]; // Count of 0s and 1s at each digit position

    for (const line of array) {
      count[parseInt(line[i])]++; // Increment count at current digit position
    }

    const targetFrequency = findMax ? Math.max(...count) : Math.min(...count);
    const targetDigit = count.indexOf(targetFrequency);

    array = array.filter((line) => parseInt(line[i]) === targetDigit);

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

filterByCommonDigits(dataset)




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
  }
  const result = potentialLines.pop()
  if (!result) {
    throw new Error('could not find significant bit')
  }
  return result
}

const oxygenBinary = filterToOneResult(true)
const co2Binary = filterToOneResult(false)
const oxygen = parseInt(oxygenBinary, 2)
const co2 = parseInt(co2Binary, 2)