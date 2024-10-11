import { loadInput } from './load.js'

// Each value of the array is a fish's number of days left to reproduce
const initialPopulation: number[] = loadInput()
const testPopulation: number[] = [1, 0, 6, 5]

export const processArray = (array: number[], iterations: number): Promise<number[]> => {
  return new Promise((resolve) => {
    for (let count = 0; count < iterations; count++) { // Counter for iterations
      const newFish = array.filter(num => num === 0).length; // Count how many 0s
      console.log(`Before mapping:`); // Debug output before mapping
      console.log(array); // Debug output before mapping

      array = array.map(num => (num === 0 ? 6 : num - 1)); // Decrement or reset to 6
      console.log(`After mapping:`); // Debug output after mapping
      console.log(array); // Debug output after mapping
      
      // Append new fish after mapping
      for (let i = 0; i < newFish; i++) {
          array.push(8); // Push 8 for each zero found
      }
      console.log(`After adding new fish:`); // Debug output after adding new fish
      console.log(array); // Debug output after adding new fish
    }
    console.log(`After ${iterations} days, population is ${array.length}`);
    resolve(array);
  });
};

processArray(testPopulation, 5).then(finalArray => {
  console.log(`There are ${finalArray.length} lanternfish after 80 days`)
});