import { loadInput } from './load.js';

// Function to count fish by their days left to reproduce
const countFishByDaysLeft = (array: number[]) => {
  const initialFishDistribution = new Array(9).fill(0);
  array.forEach(num => {
    initialFishDistribution[num]++;
  });
  return initialFishDistribution;
};

// Generic function to simulate fish population over a given number of days
const simulateFishPopulation = (dataset: number[], iterations: number) => {
  return new Promise((resolve) => {
    const fishByDaysLeft = countFishByDaysLeft(dataset);

    for (let count = 0; count < iterations; count++) {
      const reproductiveFish = fishByDaysLeft[0]; // Number of fish that are due to give birth

      // Update days left for each fish
      for (let i = 1; i < fishByDaysLeft.length; i++) {
        fishByDaysLeft[i - 1] = fishByDaysLeft[i];
      }

      fishByDaysLeft[8] = reproductiveFish;   // New fish get birthed by the reproductive fish
      fishByDaysLeft[6] += reproductiveFish; // The previously reproductive fish now get added to the 6-day-left fish

      // Log the fish counts for debugging
      console.log(`After day ${count + 1}:`, fishByDaysLeft);
    }

    // Calculate the total population after the iterations
    const population = fishByDaysLeft.reduce((sum, count) => sum + count, 0);
    console.log(`After ${iterations} days, population is: ${population}`);
    resolve(fishByDaysLeft);
  });
};

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
