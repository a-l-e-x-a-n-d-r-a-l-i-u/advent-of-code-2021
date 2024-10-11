import { loadInput } from './load.js';

// Function to count fish by their days left to reproduce
const countFishByDaysLeft = (array) => {
  const fishByDaysLeft = new Array(9).fill(0);
  array.forEach(num => {
    fishByDaysLeft[num]++;
  });
  return fishByDaysLeft;
};

// Generic function to simulate fish population over a given number of days
const simulateFishPopulation = (initialPopulation, iterations) => {
  return new Promise((resolve) => {
    const fishCounts = countFishByDaysLeft(initialPopulation);

    for (let count = 0; count < iterations; count++) {
      const reproductiveFish = fishCounts[0]; // Number of fish that are due to give birth

      // Update days left for each fish
      for (let i = 1; i < fishCounts.length; i++) {
        fishCounts[i - 1] = fishCounts[i];
      }

      fishCounts[8] = reproductiveFish;   // New fish get birthed by the reproductive fish
      fishCounts[6] += reproductiveFish; // The previously reproductive fish now get added to the 6-day-left fish

      // Log the fish counts for debugging
      console.log(`After day ${count + 1}:`, fishCounts);
    }

    // Calculate the total population after the iterations
    const population = fishCounts.reduce((sum, count) => sum + count, 0);
    console.log(`After ${iterations} days, population is: ${population}`);
    resolve(fishCounts);
  });
};

// Load initial fish populations
const everyFish = loadInput();
const testPond = [1, 0, 6, 5];

// Simulate for different scenarios
simulateFishPopulation(everyFish, 256).then(finalArray => {
  console.log(`Final fish counts after 256 days:`, finalArray);
});

simulateFishPopulation(testPond, 6).then(finalArray => {
  console.log(`Final fish counts for test pond after 6 days:`, finalArray);
});
