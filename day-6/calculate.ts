import { loadInput } from './load.js';
import { splitArray, dayCounter } from './makeChunks.js';

// Each value of the array is a fish's number of days left to reproduce
const initialPopulation: number[] = loadInput();
const chunkSize = 50000;
const chunks = splitArray(initialPopulation, chunkSize);

// Process each chunk separately and collect the promises
const processChunks = chunks.map((chunk, index) => {
  return dayCounter(chunk, 80).then(eightyDayResult => {
    console.log(`Population for chunk ${index + 1} after 80 days:`, eightyDayResult.length);
    return dayCounter(eightyDayResult, 176); // Process 80-day population for another 176 days to get 256-day population
  });
});

// Wait for all chunks to finish processing
Promise.all(processChunks)
  .then(results => {
    const finalPopulation = results.flat();
    console.log(`Population after 256 days:`, finalPopulation.length);
  })
  .catch(error => {
    console.error('Error processing chunks:', error);
  });