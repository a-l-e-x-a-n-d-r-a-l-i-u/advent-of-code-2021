import { loadInput } from './load.js';

// Each value of the array is a fish's number of days left to reproduce
const initialPopulation: number[] = loadInput();

const processArray = (array: number[], iterations: number): Promise<number[]> => {
  return new Promise((resolve) => {
    let count = 0; // Counter for iterations

    const intervalId = setInterval(() => {
      array.forEach(num => {
        if (num === 0) {
        array.push(9) // Push a new fish for the next time it runs
      }
    })

    array = array.map(num => (num === 0 ? 6 : num - 1)); // Decrement or reset to 6

      if (++count >= iterations) {
        clearInterval(intervalId);
        console.log(`After ${iterations} days, population is ${array.length}`);
        resolve(array);
      }
    }, 300);
  });
};

// Process for both 80 and 256 iterations concurrently
Promise.all([
  processArray([...initialPopulation], 80),
  processArray([...initialPopulation], 256)
]).then(([result80, result256]) => {
  console.log(`Population after 80 days: ${result80.length}`);
  console.log(`Population after 256 days: ${result256.length}`);
});
