export const splitArray = (array: number[], numChunks: number): number[][] => {
  const chunkSize = Math.ceil(array.length / numChunks); // Math.ceil() rounds up fractios to the nearest whole number, so 10/3 will have an chunk size of 4
  const chunks: number[][] = []; // [[1,2,3,4], [5,6,7,8], [9,10]
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize)); // Basically slicing it by array.slice(0, 4), array.slice(4, 8), array.slice(8, 12)
  }
  return chunks;
};

export const dayCounter = (array: number[], iterations: number): Promise<number[]> => {
  return new Promise((resolve) => {
    for (let count = 0; count < iterations; count++) {
      array.forEach(num => {
        if (num === 0) { array.push(9) }  // Push a new fish for each 0
    })

    array = array.map(num => (num === 0 ? 6 : num - 1)); // Decrement or reset to 6

    }
//    console.log(`${iterations}-day population from current dataset:`, array.length);
    resolve(array);
  });
};