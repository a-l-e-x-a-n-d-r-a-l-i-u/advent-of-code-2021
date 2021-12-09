import { Grid, Point } from './Grid.js'
import { loadInput } from './load.js'

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
