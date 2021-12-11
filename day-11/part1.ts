import { loadInput } from './load.js'
import { calculateATick } from './octopus.js'

const grid = loadInput()

let flashes = 0
for (let tick = 1; tick <= 100; tick += 1) {
  const flashesThisTick = calculateATick(grid)
  console.log('tick', tick, 'had', flashesThisTick, 'flashes this tick')
  flashes += flashesThisTick
}

console.log('total flashes', flashes)
