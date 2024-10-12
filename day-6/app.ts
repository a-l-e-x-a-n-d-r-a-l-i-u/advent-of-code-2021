import { loadInput } from './load.js';
import { simulateFishPopulation } from './simulation.js';

// Load initial fish populations
const everyFish = loadInput();
const testPond = [1, 0, 6, 5];

// Simulate for different scenarios
simulateFishPopulation(everyFish, 256).then(finalArray => {
  console.log(`Final fish counts after 256 days:`, finalArray);
});

simulateFishPopulation(everyFish, 80).then(finalArray => {
  console.log(`Final fish counts after 80 days:`, finalArray);
});

simulateFishPopulation(testPond, 6).then(finalArray => {
  console.log(`Test fish counts for test pond after 6 days:`, finalArray);
});
