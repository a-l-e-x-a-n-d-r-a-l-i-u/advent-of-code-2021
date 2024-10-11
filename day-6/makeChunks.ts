export const splitArray = (array: number[], numChunks: number): number[][] => {
  const chunkSize = Math.ceil(array.length / numChunks); // Math.ceil() rounds up fractios to the nearest whole number, so 10/3 will have an chunk size of 4
  const chunks: number[][] = []; // [[1,2,3,4], [5,6,7,8], [9,10]
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize)); // Basically slicing it by array.slice(0, 4), array.slice(4, 8), array.slice(8, 12)
  }
  return chunks;
};

export const dayCounter = (array, iterations): Promise<number[]> => {
  return new Promise((resolve) => {
    let count = 0;

    const intervalId = setInterval(() => {
      array = array.map(num => (num === 0 ? 6 : num - 1)); // Decrement or reset to 6
      if (array.some(num => num === 0)) {
        array.push(8); // New fish with 8-day reproduction cycle
      }

      if (++count >= iterations) {
        clearInterval(intervalId);
        console.log(`After ${iterations} days, population is:`, array.length);
        resolve(array); // Resolve the promise with the final array
      }
    }, 200);
  });
};
