import { readFileSync } from 'fs'

export function loadInput(): string[][] {
  return readFileSync('input', { encoding: 'utf-8' })
    .split('\n')
    .filter((line) => line.length > 0)
    .map(str => str.split(' | '));
}

const segmentsByDigit: string[] = [
  'abcefg',
  'cf',
  'acdfg',
  'bcdf',
  'abdfg',
  'abdefg',
  'acf',
  'abcdef',
  'abcdfg'
]

const convertStringToArray = (input: string): string[] => {
  return input.split(' ');
};

const normalizeString = (input: string): string => {
  return input.split('').sort().join()
}

const findTwoLetterStrings = (input: string[]): string[] => {
  return input.filter(word => word.length === 2);
};

const signals: string[][] = loadInput()
console.log(signals[0])

const signalInput: string[] = convertStringToArray(signals[0][0])
const signalOutput: string[] = convertStringToArray(signals[0][1])
console.log(signalInput)
console.log(signalOutput)
console.log(findTwoLetterStrings(signalInput)


