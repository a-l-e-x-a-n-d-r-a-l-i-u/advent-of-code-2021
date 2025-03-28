import { readFileSync } from 'fs'

export function loadInput(): string[][] {
  return readFileSync('input', { encoding: 'utf-8' })
    .split('\n')
    .filter((line) => line.length > 0)
    .map(str => str.split(' | '));
}

const convertStringToArray = (input: string): string[] => {
  return input.split(' ');
};

const normalizeString = (input: string): string => {
  return input.split('').sort().join('')
}

// Now load input
const signals: string[][] = loadInput()

// Initialize a new array to store the normalized signals
export const normalizedSignals: { input: string[]; output: string[] }[] = [];

signals.forEach(signal => {
  const [input, output] = signal;

  const signalInput: string[] = convertStringToArray(input).map(normalizeString)
  const signalOutput: string[] = convertStringToArray(output).map(normalizeString)

  normalizedSignals.push({ input: signalInput, output: signalOutput });
});

console.log(normalizedSignals)