import { loadInput } from './load.js'

// Each value of the array is a fish's number of days left to reproduce
const everyFish: number[] = loadInput()

export const processArray = (array: number[], iterations: number): Promise<number[]> => {
  return new Promise((resolve) => {
    for (let count = 0; count < iterations; count++) { // Counter for iterations
      const newFish = array.filter(num => num === 0).length; // Count how many 0s
//      console.log(`Before mapping:`);
//      console.log(array);

      array = array.map(num => (num === 0 ? 6 : num - 1)); // Decrement or reset to 6
//      console.log(`After mapping:`);
//      console.log(array);
      
      for (let i = 0; i < newFish; i++) { // Push a new fish for each zero found
          array.push(8);
      }
//      console.log(`After adding new fish:`);
      console.log(array);
    }
    console.log(`After ${iterations} days, population is ${array.length}`);
    resolve(array);
  });
};

processArray(everyFish, 80).then(finalArray => {
  console.log(`There are ${finalArray.length} lanternfish after 256 days`)
});