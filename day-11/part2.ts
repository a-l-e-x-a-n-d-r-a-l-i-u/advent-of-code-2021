import { loadInput } from './load.js'
import { calculateATick } from './octopus.js'

const grid = loadInput()
let tick = 0
let allSimultaneous = false
while (!allSimultaneous) {
  tick += 1
  const flashesThisTick = calculateATick(grid)
  console.log('tick', tick, 'had', flashesThisTick, 'flashes this tick')
  if (flashesThisTick === 100) {
    allSimultaneous = true
  }
}

console.log('all simultaneous tick', tick)
