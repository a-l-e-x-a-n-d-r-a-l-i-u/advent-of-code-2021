import { loadInput } from './load.js';

// Generic function to process fish population based on the specified counting method
const simulateFishPopulation = (initialPopulation, iterations, countingMethod) => {
  return new Promise((resolve) => {
    const fishCounts = countingMethod(initialPopulation);
    
    for (let count = 0; count < iterations; count++) {
      const reproductiveFish = fishCounts[0]; // Number of fish that are due to give birth

      // As the day passes, the number of days left to reproduce goes down
      for (let i = 1; i < fishCounts.length; i++) {
        fishCounts[i - 1] = fishCounts[i];
      }

      fishCounts[8] = reproductiveFish;   // New fish get birthed by the reproductive fish
      fishCounts[6] += reproductiveFish; // The previously reproductive fish now get added to the 6-day-left fish

      console.log(`After day ${count + 1}:`, fishCounts);
    }

    const population = fishCounts.reduce((sum, count) => sum + count, 0);
    console.log(`After ${iterations} days, population is: ${population}`);
    resolve(fishCounts);
  });
};

// Method for counting fish based on their days left
const countFishByDaysLeft = (array) => {
  const fishByDaysLeft = new Array(9).fill(0);
  array.forEach(num => {
    fishByDaysLeft[num]++;
  });
  return fishByDaysLeft;
};

// Load initial fish populations
const everyFish = loadInput();
const testPond = [1, 0, 6, 5];

// Simulate fish population for different scenarios
simulateFishPopulation(everyFish, 80, countFishByDaysLeft).then(finalArray => {
  console.log(`There are ${finalArray.length} lanternfish after 80 days`);
});

simulateFishPopulation(testPond, 6, countFishByDaysLeft).then(finalArray => {
  console.log(finalArray);
});
