import { CrabArmy } from './CrabArmy.js'
import { loadInput } from './load.js'

const initialPositions = loadInput()
console.log(`Initial positions: ${initialPositions}`)

const calculateFuelUsedPerCrab = (positions: number[], target: number): number[] => {
  return positions
    .map(num => Math.abs(num - target)) // Absolute values
};

const calculateTotalFuelUsed = (positions: number[], target: number): number => {
  const fuelUsedPerCrab = calculateFuelUsedPerCrab(positions, target);
  console.log(`Fuel used per crab: ${fuelUsedPerCrab}`)
  return fuelUsedPerCrab.reduce((acc, curr) => acc + curr, 0);
};

console.log(`Total fuel used: ${calculateTotalFuelUsed(initialPositions, 0)}`)

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
