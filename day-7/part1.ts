import { CrabArmy } from './CrabArmy.js'
import { loadInput } from './load.js'

const initialPositions = loadInput()
console.log(`Initial positions: ${initialPositions}`)

const calculateFuelUsedPerCrab = (positions: number[], target: number): number[] => {
  return positions
    .map(num => Math.abs(num - target)) // Absolute values
};

const findMedian = (numbers: number[]): number => {
  const sortAscending = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sortAscending.length / 2); // Round it down so it becomes your index
  return sortAscending.length % 2 !== 0
    ? sortAscending[mid] // If odd, return element ar midpoint
    : (sortAscending[mid - 1] + sortAscending[mid]) / 2; // If even, return the average of the two middle elements
};

const calculateTotalFuelUsed = (positions: number[], target: number): number => {
  const fuelUsedPerCrab = calculateFuelUsedPerCrab(positions, target);
  console.log(`Fuel used per crab: ${fuelUsedPerCrab}`)
  return fuelUsedPerCrab.reduce((acc, curr) => acc + curr, 0);
};

// Store variables
const idealTarget: number = findMedian(initialPositions)
console.log(`Ideal target: ${idealTarget}`)
const totalFuelUsed: number = calculateTotalFuelUsed(initialPositions, idealTarget)
console.log(`Total fuel used: ${totalFuelUsed}`)