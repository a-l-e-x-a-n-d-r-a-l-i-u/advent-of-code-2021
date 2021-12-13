import { loadInput } from './load.js'
import { buildDotSet, fold } from './paper.js'

const input = loadInput()

const dotSet = buildDotSet(input.dots)

const dotsAfterFirstFold = fold(dotSet, input.folds[0])

console.log(dotsAfterFirstFold.size)
