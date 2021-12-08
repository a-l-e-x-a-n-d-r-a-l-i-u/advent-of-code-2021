import { loadInput } from './load.js'

const input = loadInput()

const allSimpleNumbers = input
  .flatMap((entry) => entry.numericOutput)
  .filter((signal) => signal.length === 2 || signal.length === 4 || signal.length === 3 || signal.length === 7)

console.log('simple number count', allSimpleNumbers.length)
