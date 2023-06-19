import { loadInput } from './common.js'

const dataset: string[] = loadInput()

function getPowerConsumption(array: string[]) {
  const halfwayPoint = array.length / 2
  const numberOfDigits = array[0].length

  const countOfZeros: number[] = Array(numberOfDigits).fill(0);
    
  // Count the occurrence of zeros at each digit position
  for (const line of array) {
    for (let i = 0; i < line.length; i++) {
      if (line[i] === "0") {
        countOfZeros[i]++
        
      } else {
        continue
      }
    }
  }

  console.log('count of zeros', countOfZeros)
  console.log('halfway point', halfwayPoint)

  // Create binary arrays
  const gammaArray: number[] = countOfZeros.map((number) => number > halfwayPoint ? 0 : 1)
  const epsilonArray: number[] = countOfZeros.map((number) => number < halfwayPoint ? 0 : 1)

  // Parse the binary numbers into integers
  const gammaResult = parseInt(gammaArray.join(""), 2)
  const epsilonResult = parseInt(epsilonArray.join(""), 2)

  console.log('gamma:', gammaResult, 'epsilon:', epsilonResult)
  console.log('power consumption:', gammaResult * epsilonResult)
}

getPowerConsumption(dataset)