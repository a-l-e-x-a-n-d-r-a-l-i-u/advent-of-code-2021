import { readFileSync } from 'fs'

export function loadInput(): number[] {
  const dataset = readFileSync('input', { encoding: 'utf-8' })
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map(Number);
    
    if (dataset.length === 0) {
      throw new Error('Dataset is emptry, could not parse')
    }

    if (!dataset.every((line) => line.toString().length === dataset[0].toString().length)) {
      throw new Error('Elements in this dataset do not have the same length')
    }

    return dataset
}