import { AStar } from './a-star.js'
import { AmphipodHallway } from './AmphipodHallway.js'
import { loadInput } from './load.js'

const input = loadInput()
const start = new AmphipodHallway(input)

console.log('start state', start.toJS())
console.log(start.asHallway)
const winningPaths = AStar(start)
const [shortestPath, shortestCost] = winningPaths[0]

console.log('best path:')
for (const step of shortestPath) {
  console.log(step.asHallway)
}
console.log('shortest cost', shortestCost)
