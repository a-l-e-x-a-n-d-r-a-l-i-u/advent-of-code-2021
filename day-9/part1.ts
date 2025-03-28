import { Grid, Point } from './Grid.js'
import { loadInput } from './load.js'

// Gradient descent is flaws because it doesn't consider local vs global minima

/*

Algorithm to Find Local Minima
Iterate over each element in the grid.
Compare it with its adjacent neighbours (up, down, left, right).
If it's smaller than all its neighbours, it's a local minimum.
**/


console.log(findLocalMinima(grid));


const input = loadInput()

const grid = new Grid(input)

let totalRiskLevel = 0
for (let x = 0; x <= grid.maxGridX; x += 1) {
  for (let y = 0; y <= grid.maxGridY; y += 1) {
    const currentPoint: Point = [x, y]
    const currentValue = grid.valueAtPoint(currentPoint)
    const neighbors = grid.findNeighbors(currentPoint)
    const localMinimum = neighbors.every((neighbor) => grid.valueAtPoint(neighbor) > currentValue)
    if (localMinimum) {
      totalRiskLevel += currentValue + 1
    }
  }
}

console.log('total risk level', totalRiskLevel)
