import { readFileSync } from 'fs'

const binaryChecker: RegExp = /^[01]+$/;

export function loadInput(): string[] {
  
  const dataset = readFileSync('input', { encoding: 'utf-8' })
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    
    if (dataset.length === 0) {
      throw new Error('Dataset is empty, could not parse')
    }  

    //Check that all lines in the dataset are of the same length
    if (!dataset.every((line) => line.length === dataset[0].length)) {
      for (let i = 1; i < dataset.length; i++) {
        if (dataset[i].length !== dataset[0].length) {
          console.log(i, ':', dataset[i])
          throw new Error('Line(s) in this dataset do not have the same length')
        }
      }
    }

    //Check that all lines contain only 1s or 0s
    for (const line of dataset) {
      if (!binaryChecker.test(line)) {
        console.log(line)
        throw new Error('Line(s) in this dataset contain characters other than 1s or 0s')
      }
    }

    return dataset
}