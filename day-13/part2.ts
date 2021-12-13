import { loadInput } from './load.js'
import { buildDotSet, fold, printDotSet } from './paper.js'

const input = loadInput()

let dotSet = buildDotSet(input.dots)

for (const foldInstruction of input.folds) {
  dotSet = fold(dotSet, foldInstruction)
}

printDotSet(dotSet)
