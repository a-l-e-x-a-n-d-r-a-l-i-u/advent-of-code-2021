import { loadInput } from './load.js'

type Point = [number, number]

const grid = loadInput()

const maxGridX = grid[0].length - 1
const maxGridY = grid.length - 1

function findNeighbors(point: Point): Point[] {
  const results: Point[] = []
  if (point[0] !== 0) {
    results.push([point[0] - 1, point[1]]) //left
  }
  if (point[0] !== maxGridX) {
    results.push([point[0] + 1, point[1]]) //right
  }
  if (point[1] !== 0) {
    results.push([point[0], point[1] - 1]) //up
  }
  if (point[1] !== maxGridY) {
    results.push([point[0], point[1] + 1]) //down
  }
  return results
}

function valueAtPoint(point: Point): number {
  return grid[point[1]][point[0]]
}

let totalRiskLevel = 0
for (let x = 0; x <= maxGridX; x += 1) {
  for (let y = 0; y <= maxGridY; y += 1) {
    const currentPoint: Point = [x, y]
    const currentValue = valueAtPoint(currentPoint)
    const neighbors = findNeighbors(currentPoint)
    const localMinimum = neighbors.every((neighbor) => valueAtPoint(neighbor) > currentValue)
    if (localMinimum) {
      totalRiskLevel += currentValue + 1
    }
  }
}

console.log('total risk level', totalRiskLevel)
