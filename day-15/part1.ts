import { AStar, NodeFactory } from './a-star.js'
import { loadInput } from './load.js'

const input = loadInput()

const grid = input.flatMap((row, y) => row.map((cost, x) => NodeFactory({ x, y, cost }))).toSet()

const start = grid.find((node) => node.x === 0 && node.y === 0)
if (!start) {
  throw new Error('could not find start node')
}
const maxX = grid
  .valueSeq()
  .map((node) => node.x)
  .max()
const maxY = grid
  .valueSeq()
  .map((node) => node.y)
  .max()

const goal = grid.find((node) => node.x === maxX && node.y === maxY)
if (!goal) {
  throw new Error('could not find goal node')
}

const shortestPath = AStar(grid, start, goal)

const shortestCost = shortestPath
  .toSeq()
  .skip(1)
  .map((node) => node.cost)
  .reduce((prev, curr) => prev + curr, 0)

console.log('shortest cost', shortestCost)
