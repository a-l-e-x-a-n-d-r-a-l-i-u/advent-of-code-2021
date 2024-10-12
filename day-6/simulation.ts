// Function to count fish by their days left to reproduce
const countFishByDaysLeft = (dataset: number[]) => {
  const initialFishDistribution = new Array(9).fill(0);
  dataset.forEach(num => {
    initialFishDistribution[num]++;
  });
  return initialFishDistribution;
};

// Generic function to simulate fish population over a given number of days
export const simulateFishPopulation = (dataset: number[], iterations: number) => {
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