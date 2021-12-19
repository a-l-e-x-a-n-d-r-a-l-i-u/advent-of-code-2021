import { loadInput } from './load.js'

const targetArea = loadInput()

const maxYVelocity = -targetArea.minY - 1

const maxY = (maxYVelocity * (maxYVelocity + 1)) / 2 // 1 + 2 + ... + maxYVelocity

console.log('largest apex of height', maxY)
