import { processAllCuboids } from './calculate-cuboid-commands.js'
import { loadInput } from './load.js'

const input = loadInput()

const minimum = -50
const maximum = 50
const refinedInput = input.filter(
  (step) =>
    step.minimum.x >= minimum &&
    step.minimum.y >= minimum &&
    step.minimum.z >= minimum &&
    step.maximum.x <= maximum &&
    step.maximum.y <= maximum &&
    step.maximum.z <= maximum,
)

console.log('total size', processAllCuboids(refinedInput))
