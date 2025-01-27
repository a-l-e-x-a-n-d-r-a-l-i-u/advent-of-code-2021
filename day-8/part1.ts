import { normalizedSignals } from './parser.js'

const signalOutputs = normalizedSignals.map(signal => {
  const output = signal.output
  return output;
})

console.log(signalOutputs)

function countSpecificLengths(signalOutputs: string[][]): number {
  const validLengths = [2, 3, 4, 7]; // Define the string lengths to count for digits 1, 4, 7, 8
  let count = 0;

  signalOutputs.forEach(output => {
    count += output.filter(str => validLengths.includes(str.length)).length;
  });

  return count;
}

console.log(countSpecificLengths(signalOutputs)); // Output: 5