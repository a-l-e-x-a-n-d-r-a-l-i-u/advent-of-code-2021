import { loadInput } from './common.js'
import { Grid } from './Grid.js'

const allVectors = loadInput()

const grid = new Grid()

for (const vector of allVectors) {
  grid.addVectorPoints(vector)
}

const totalOverlaps = grid.countOfOverlaps

console.log('total overlaps', totalOverlaps)
