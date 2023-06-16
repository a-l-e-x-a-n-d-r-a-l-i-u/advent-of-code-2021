import { loadInput } from './common.js'

const dataset: string[] = loadInput()

const totalLines = dataset.length
const totalDigitsPerLine = dataset[0].length

function createResultNumber(array: string[]) {
  const countsOfDigitPositions = {};
    
  // Count the occurrence of each digit position
  for (const line of array) {
    const digits = line.split("");
    for (let i = 0; i < digits.length; i++) {
      countsOfDigitPositions[i] = {};
      countsOfDigitPositions[i][digits[i]] = (countsOfDigitPositions[i][digits[i]] || 0) + 1;
    }
  }
    
    // Find the most common digit for each position
    const resultDigits = [];
    for (const position in countsOfDigitPositions) {
      const positionCounts = countsOfDigitPositions[position];
      let mostCommonDigit = null;
      let highestCount = -1;
      for (const digit in positionCounts) {
        if (positionCounts[digit] > highestCount) {
          mostCommonDigit = digit;
          highestCount = positionCounts[digit];
        }
      }
      resultDigits.push(mostCommonDigit);
    }
    
    // Combine the digits to form the resulting number
    const resultNumber = parseInt(resultDigits.join(""), 2);
    return resultNumber.toString(2).padStart(3, "0");
  }
  
  // Example usage:
  const result = createResultNumber(dataset);
  
  console.log(result);


public get currentGammaAndEpsilon(): [number, number] {
  const halfwayPoint = this.totalLines / 2
  const gammaArray: number[] = []
  const epsilonArray: number[] = []
  for (const count of this.currentCount) {
    const moreOnesThanZeros = count > halfwayPoint
    gammaArray.push(moreOnesThanZeros ? 1 : 0)
    epsilonArray.push(moreOnesThanZeros ? 0 : 1)
  }
  // console.log('binary of current count', gammaArray.join(''))
  return [parseInt(gammaArray.join(''), 2), parseInt(epsilonArray.join(''), 2)]
}