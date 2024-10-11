import { loadInput } from './load.js';

// Each value of the array is a fish's number of days left to reproduce
const initialPopulation: number[] = loadInput();

const processArray = (array: number[], iterations: number): Promise<number[]> => {
  return new Promise((resolve) => {
    let count = 0; // Counter for iterations

    const intervalId = setInterval(() => {
      let length = array.length; // Store the current length
      for (let i = 0; i < length; i++) {
        if (array[i] === 0) {
          array.push(9); // Add new fish, won't affect current iteration because it's beyond the length
          array[i] = 6;  // Reset the current fish
        } else {
          array[i]--; // Decrement the fish timer
        }
      }

      if (++count >= iterations) {
        clearInterval(intervalId);
        console.log(`After ${iterations} days, population is ${array.length}`);
        resolve(array); // Resolve the promise with the final array
      }
    }, 300);
  });
};

// Using Promises to handle asynchronous behavior
processArray(initialPopulation, 80).then(finalArray => {
    console.log(`After 80 days, there are ${finalArray.length} lanternfish`);
});

processArray(initialPopulation, 256).then(finalArray => {
    console.log(`After 256 days, there are ${finalArray.length} lanternfish`);
});
