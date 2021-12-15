import { AStar, NodeFactory } from './a-star.js'
import { loadInput } from './load.js'

const input = loadInput()

const grid = input.map((row, y) => row.map((cost, x) => NodeFactory({ x, y, cost })))

const start = grid.get(0)?.get(0)
if (!start) {
  throw new Error('could not find start node')
}

const goal = grid.get(-1)?.get(-1)
if (!goal) {
  throw new Error('could not find goal node')
}

const shortestPath = AStar(grid, start, goal)

const shortestCost = shortestPath
  .toSeq()
  .skip(1)
  .map((node) => node.cost)
  .reduce((prev, curr) => prev + curr, 0)
console.log(
  shortestPath
    .toSeq()
    .map((node) => `${node.x},${node.y}(${node.cost})`)
    .join(' - '),
)
console.log('shortest cost', shortestCost)
