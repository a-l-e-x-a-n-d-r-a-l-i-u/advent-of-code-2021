import { CrabArmy } from './CrabArmy.js'
import { loadInput } from './load.js'

const initialPositions = loadInput()
console.log(initialPositions) // Input: [16, 1, 2, 0, 4, 2, 7, 1, 2, 14]
const target = 3;
const fuelUnitsTravelled = initialPositions.map(num => Math.abs(num - target));
console.log(fuelUnitsTravelled) // Output: [13, 2, 1, 3, 1, 1, 4, 2, 1, 11]
const totalFuelUsed = fuelUnitsTravelled.reduce((acc, curr) => acc + curr, 0);
console.log(totalFuelUsed)


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
