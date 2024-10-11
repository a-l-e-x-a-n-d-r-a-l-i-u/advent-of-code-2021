import { loadInput } from './load.js';
import { splitArray, dayCounter } from './makeChunks.js';

// Each value of the array is a fish's number of days left to reproduce
const initialPopulation: number[] = loadInput();
const numChunks = 5;
const chunks = splitArray(initialPopulation, numChunks);

// Process each chunk separately and collect the promises
const processChunks = chunks.map((chunk, index) => {
  return dayCounter(chunk, 80).then(result => {
    console.log(`Population for chunk ${index + 1} after 80 days:`, result.length);
    return result;
  });
});

// Wait for all chunks to finish processing
Promise.all(processChunks)
  .then(results => {
    const eightyDayPopulation = results.flat(); // Merge chunks into one
    console.log(`Population after 80 days:`, eightyDayPopulation.length);

    // Now process the 80-day population for 176 days to get 256-day population
    return dayCounter(eightyDayPopulation, 176);
  })
  .then(twoFiftySixDayPopulation => {
    console.log(`Population after 256 days:`, twoFiftySixDayPopulation.length);
  });
