import { loadInput } from './common.js'
import { Grid } from './Grid.js'

const allVectors = loadInput()

const straightLineVectors = allVectors.filter(
  (vector) => vector.start.x === vector.end.x || vector.start.y === vector.end.y,
)

const grid = new Grid()

for (const vector of straightLineVectors) {
  grid.addVectorPoints(vector)
}

const totalOverlaps = grid.countOfOverlaps

console.log('total overlaps', totalOverlaps)
