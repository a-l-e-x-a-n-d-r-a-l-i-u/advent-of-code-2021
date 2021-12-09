import { Grid, Point } from './Grid.js'
import { loadInput } from './load.js'

const input = loadInput()

const grid = new Grid(input)

function neighborsInBasin(point: Point): Point[] {
  const currentValue = grid.valueAtPoint(point)
  const neighbors = grid.findNeighbors(point)
  return neighbors.filter((neighbor) => {
    const neighborValue = grid.valueAtPoint(neighbor)
    return neighborValue > currentValue && neighborValue < 9
  })
}

function pointToKey(point: Point): string {
  return point.join(',')
}

function addValidNeighborsToBasin(basin: Set<string>, point: Point): void {
  const neighbors = neighborsInBasin(point)
  for (const neighbor of neighbors) {
    const key = pointToKey(neighbor)
    if (!basin.has(key)) {
      basin.add(key)
      addValidNeighborsToBasin(basin, neighbor)
    }
  }
}
const basins: Set<string>[] = []
for (let x = 0; x <= grid.maxGridX; x += 1) {
  for (let y = 0; y <= grid.maxGridY; y += 1) {
    const currentPoint: Point = [x, y]
    const currentValue = grid.valueAtPoint(currentPoint)
    const neighbors = grid.findNeighbors(currentPoint)
    const localMinimum = neighbors.every((neighbor) => grid.valueAtPoint(neighbor) > currentValue)
    if (localMinimum) {
      const basin = new Set<string>()
      basin.add(pointToKey(currentPoint))
      addValidNeighborsToBasin(basin, currentPoint)
      basins.push(basin)
    }
  }
}
basins.sort((a, b) => b.size - a.size)
const threeLargestBasins = basins.slice(0, 3)
console.log('three largest basins', threeLargestBasins)
const finalBasinIndex = threeLargestBasins[0].size * threeLargestBasins[1].size * threeLargestBasins[2].size
console.log('final basin index', finalBasinIndex)
