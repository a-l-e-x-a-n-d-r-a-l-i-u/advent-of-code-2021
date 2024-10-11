import { loadInput } from './load.js'

// Each value of the array is a fish's number of days left to reproduce
const everyFish: number[] = loadInput();
const testPond: number[] = [1, 0, 6, 5]


export const dayCounter = (array: number[], iterations: number): Promise<number[]> => {
  return new Promise((resolve) => {

    // Keep an array for the number of fish by days left to reproduce
    const fishByDaysLeft = new Array(9).fill(0);
    array.forEach(num => {
      fishByDaysLeft[num]++;
    });

    // Process array
    for (let count = 0; count < iterations; count++) {
      const reproductiveFish = fishByDaysLeft[0]; // Number of fish that are due to give birth

      // As the day passes, the number of days left to reproduce goes down
      for (let i = 1; i < fishByDaysLeft.length; i++) {
        fishByDaysLeft[i - 1] = fishByDaysLeft[i];
      }

      fishByDaysLeft[8] = reproductiveFish;   // New fish get birthed by the reproductive fish
      fishByDaysLeft[6] += reproductiveFish; // The previously reproductive fish now get added to the 6-day-left fish

      // Test
      console.log(`After day ${count + 1}:`, fishByDaysLeft);
    }

    // Calculate the total population after the iterations
    const population = fishByDaysLeft.reduce((sum, count) => sum + count, 0);
    
    console.log(`After ${iterations} days, population is: ${population}`);
    resolve(fishByDaysLeft);
  });
};

dayCounter(everyFish, 256).then(finalArray => {
  console.log(finalArray)
});