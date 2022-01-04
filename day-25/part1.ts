import { Grid } from './Grid.js'
import { loadInput } from './load.js'

const input = loadInput()

const grid = new Grid(input)

grid.calculateStepsUntilStable()

console.log('steps until stable', grid.stepsMoved)
