import { CrabArmy } from './CrabArmy.js'
import { loadInput } from './load.js'

const initialPositions = loadInput()
const calculateFuelUsed = (positions: number[], target: number): number => {
  return positions
    .map(num => Math.abs(num - target)) // Calculate fuel units consumed from each starting position to get to target
    .reduce((acc, curr) => acc + curr, 0); // Sum up fuel for all positions
};

console.log(calculateFuelUsed(initialPositions, 3))


// Frank's code starts here
const army = new CrabArmy(initialPositions)

//lets just brute force for now
let minimumFuelUse = Number.POSITIVE_INFINITY
let bestPosition: number | null = null
for (let testPosition = army.minimumPosition; testPosition <= army.maximumPosition; testPosition += 1) {
  const fuelUse = army.naiveFuelToMoveToPosition(testPosition)
  if (fuelUse < minimumFuelUse) {
    minimumFuelUse = fuelUse
    bestPosition = testPosition
  }
}

console.log('fuel use', minimumFuelUse)
console.log('best position', bestPosition)
