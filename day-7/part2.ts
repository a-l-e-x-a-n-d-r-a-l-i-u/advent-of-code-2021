import { loadInput } from './load.js'

const initialPositions = loadInput()
console.log(`Initial positions: ${initialPositions}`)

const calculateDistanceTravelledPerCrab = (positions: number[], target: number): number[] => {
  return positions
  .map(num => Math.abs(num - target)) // Calculate distance travelled per crab
};

const calculateFuelUsedPerCrab = (distances: number[], target: number): number[] => {
  return calculateDistanceTravelledPerCrab(distances, target)
  .map(dist => dist * (dist + 1) / 2); // Calculate fuel usage by f(x) = x(x+1)/2
}

const calculateTotalFuelUsed = (positions: number[], target: number): number => {
  return calculateFuelUsedPerCrab(positions, target).reduce((acc, curr) => acc + curr, 0);
};

const findMedian = (numbers: number[]): number => {
  const sortAscending = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sortAscending.length / 2); // Round it down so it becomes your index
  return sortAscending.length % 2 !== 0
    ? sortAscending[mid] // If odd, return element ar midpoint
    : (sortAscending[mid - 1] + sortAscending[mid]) / 2; // If even, return the average of the two middle elements
};

const findMean = (numbers: number[]): number => {
  const sum = numbers.reduce((acc, curr) => acc + curr, 0); // Sum of all elements
  return sum / numbers.length; // Divide sum by the length of the array
};

// Part 1 Answers
const idealTarget: number = findMedian(initialPositions)
console.log(`Ideal target: ${idealTarget}`)
const totalFuelUsed: number = calculateTotalFuelUsed(initialPositions, 4)
console.log(`Total fuel used: ${totalFuelUsed}`)
