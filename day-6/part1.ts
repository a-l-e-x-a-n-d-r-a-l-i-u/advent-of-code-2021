import { loadInput } from './load.js'

// Each value of the array is a fish's number of days left to reproduce
const initialPopulation: number[] = loadInput()

const processArray = (array: number [], iterations: number) => {
  let count = 0; // Counter for iterations

  const intervalId = setInterval(() => {
      array = array.map(num => (num === 0 ? 6 : num - 1)); // Decrement or reset to 6
      if (array.some(num => num === 0)) {
        array.push(8)
      }

      if (++count >= iterations) {
          clearInterval(intervalId)
          console.log(`After ${iterations} days, population is ${array}`);
          return array
      }
  }, 1000); // Repeat every second
};

const finalArray = processArray(initialPopulation, 80)
console.log(finalArray)