import { List } from 'immutable'
import { AStar, NodeFactory, Node } from './a-star.js'
import { loadInput } from './load.js'

const input = loadInput()

const widthX = input.get(0)!.size
const widthY = input.size
const grid = List<List<Node>>().withMutations((mutableGrid) => {
  for (let yMultiplier = 0; yMultiplier < 5; yMultiplier += 1) {
    mutableGrid.push(
      ...input.map((inputRow, y) => {
        return List<Node>().withMutations((mutableRow) => {
          for (let xMultiplier = 0; xMultiplier < 5; xMultiplier += 1) {
            const costExtra = xMultiplier + yMultiplier
            mutableRow.push(
              ...inputRow.map((cost, x) => {
                let newCost = cost + costExtra
                if (newCost > 9) {
                  newCost = (newCost % 10) + 1
                }
                return NodeFactory({
                  x: x + xMultiplier * widthX,
                  y: y + yMultiplier * widthY,
                  cost: newCost,
                })
              }),
            )
          }
        })
      }),
    )
  }
})

for (const row of grid) {
  console.log(row.map((node) => node.cost).join(''))
}
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
