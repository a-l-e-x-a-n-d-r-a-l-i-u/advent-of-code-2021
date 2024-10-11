import { loadInput } from './load.js'

// Each value of the array is a fish's number of days left to reproduce
const initialPopulation: number[] = loadInput()

const processArray = (array: number [], iterations: number): Promise<number[]> => {
  return new Promise((resolve) => {
    let count = 0; // Counter for iterations

    const intervalId = setInterval(() => {
      array.forEach(num => {
        if (num === 0) { array.push(9) }
      }) // So that next day's new fish will start counting down from 8

      array = array.map(num => (num === 0 ? 6 : num - 1)); // Decrement or reset to 6
        console.log(array)
  
        if (++count >= iterations) {
            clearInterval(intervalId)
            console.log(`After ${iterations} days, population is ${array.length}`);
            resolve(array)
        }
    }, 300);
  })
}

processArray(initialPopulation, 80).then(finalArray => {
  console.log(`There are ${finalArray.length} lanternfish after 80 days`)
});
