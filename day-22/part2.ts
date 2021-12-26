import { processAllCuboids } from './calculate-cuboid-commands.js'
import { loadInput } from './load.js'

const input = loadInput()

console.log('total size', processAllCuboids(input))
