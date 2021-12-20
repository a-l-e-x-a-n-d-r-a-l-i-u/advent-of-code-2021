import { loadInput } from './load.js'
import { add, magnitude } from './snailfish-math.js'

const homework = loadInput()

const maxMagnitude = homework
  .toSeq()
  .flatMap((left) => homework.toSeq().map((right) => [left, right] as const))
  .map(([left, right]) => add(left, right))
  .map((value) => magnitude(value))
  .max()

console.log('magnitude homework', maxMagnitude)
