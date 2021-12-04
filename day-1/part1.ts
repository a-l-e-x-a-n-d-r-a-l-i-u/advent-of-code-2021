import { countIncreases, loadInput } from './common.js'

const allLines = loadInput()

const totalIncreases = countIncreases(allLines)

console.log('total increases', totalIncreases)
