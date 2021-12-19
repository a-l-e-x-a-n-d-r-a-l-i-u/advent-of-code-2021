import { Range } from 'immutable'
import { loadInput, Area } from './load.js'

const targetArea = loadInput()

const maxXVelocity = targetArea.maxX
const maxYVelocity = -targetArea.minY - 1
const minYVelocity = targetArea.minY

function eventuallyLandsInArea(xVelocity: number, yVelocity: number, area: Area): boolean {
  let currentXVelocity = xVelocity
  let currentYVelocity = yVelocity
  let currentYPosition = 0
  let currentXPosition = 0
  while (currentYPosition >= area.minY && currentXPosition <= area.maxX) {
    if (
      currentYPosition >= area.minY &&
      currentYPosition <= area.maxY &&
      currentXPosition >= area.minX &&
      currentXPosition <= area.maxX
    ) {
      return true
    }
    currentYPosition += currentYVelocity
    currentYVelocity -= 1
    currentXPosition += currentXVelocity
    if (currentXVelocity > 0) {
      currentXVelocity -= 1
    }
  }
  return false
}

const totalSuccessfulVelocities = Range(0, maxXVelocity + 1)
  .flatMap((x) => Range(minYVelocity, maxYVelocity + 1).map((y) => [x, y] as const))
  .filter(([x, y]) => eventuallyLandsInArea(x, y, targetArea))
  .cacheResult().size

console.log('total successful velocities', totalSuccessfulVelocities)
