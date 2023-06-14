import { loadInput } from './common.js'

const dataset: number[] = loadInput()

function processLines() {
  const totalLines = dataset.length;
  const totalDigitsPerLine = dataset[0].toString().length

  for (let i = 0; i < totalDigitsPerLine; i++) {
    for (const line of dataset) {
      if (i < line.toString().length) {
        const letter: string = line.toString()[i];
        console.log(letter)
      }
    }
  }

}