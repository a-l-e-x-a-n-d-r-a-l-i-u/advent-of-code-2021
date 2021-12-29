import { AStar } from './a-star.js'
import { AmphipodHallwayV2 } from './AmphipodHallwayV2.js'
import { loadInput } from './load.js'

const input = loadInput('input2')
const start = new AmphipodHallwayV2(input)
console.log('start state', start.toJS())
console.log(start.asHallway)
const winningPaths = AStar(start, 1)
const [shortestPath, shortestCost] = winningPaths[0]

console.log('best path:')
for (const step of shortestPath) {
  console.log(step.asHallway)
}
console.log('shortest cost', shortestCost)
