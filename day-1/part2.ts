import { countIncreases, loadInput } from './common.js'

const allLines = loadInput()

const windowedResults = allLines
  .map((_, i, array) => (i < array.length - 2 ? array[i] + array[i + 1] + array[i + 2] : null))
  .filter((group): group is number => group !== null)
const totalIncreases = countIncreases(windowedResults)

console.log('total increases', totalIncreases)
