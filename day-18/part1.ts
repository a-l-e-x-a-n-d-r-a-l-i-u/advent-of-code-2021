import { loadInput } from './load.js'
import { magnitude, sumAll } from './snailfish-math.js'

const homework = loadInput()

const summedHomework = sumAll(homework.toSeq())

const magnitudeHomework = magnitude(summedHomework)

console.log('magnitude homework', magnitudeHomework)
