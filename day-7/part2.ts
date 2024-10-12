import { loadInput } from './load.js'

const initialPositions = loadInput()
console.log(`Initial positions: ${initialPositions}`)

const calculateFuelUsage = (positions: number[], target: number): number => {
  const distanceTravelledPerCrab: number[] = positions.map(num => Math.abs(num - target))
  console.log(`Distance travelled per crab: ${distanceTravelledPerCrab}`)
  const fuelUsagePerCrab: number[] = distanceTravelledPerCrab.map(dist => dist * (dist + 1) / 2)
  console.log(`Fuel usage per crab: ${fuelUsagePerCrab}`)
  const sumTotalFuelUsage: number = fuelUsagePerCrab.reduce((acc: number, curr: number) => acc + curr, 0)
  console.log(`Total fuel used: ${sumTotalFuelUsage}`)
  return sumTotalFuelUsage
}

const findIdealTarget = (positions: number[]): { idealTarget: number, leastFuelUsed: number } => {
  const minPosition = Math.min(...positions); // Minimum value in the array
  const maxPosition = Math.max(...positions); // Maximum value in the array

  // Initialise the resulting variables
  let idealTarget = minPosition;
  let leastFuelUsed = calculateFuelUsage(positions, minPosition);

  // Check fuel usage for all target positions within range of the array
  for (let target = minPosition + 1; target <= maxPosition; target++) {
    console.log(`Now testing at target position ${target}`)
    const fuelNeededToCurrentTarget = calculateFuelUsage(positions, target);
    if (fuelNeededToCurrentTarget < leastFuelUsed) {
      leastFuelUsed = fuelNeededToCurrentTarget;
      idealTarget = target;
    }
    console.log(leastFuelUsed)
  }

  return { idealTarget, leastFuelUsed };
};

// Part 1 Answers
const idealResult: { idealTarget: number, leastFuelUsed: number } = findIdealTarget(initialPositions)
console.log(idealResult)