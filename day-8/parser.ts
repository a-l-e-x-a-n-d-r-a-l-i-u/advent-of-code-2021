import { readFileSync } from 'fs'

export function loadInput(): string[][] {
  return readFileSync('test', { encoding: 'utf-8' })
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

const possibilityGraph: { [key: string]: string[] } = {
  'a': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  'b': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  'c': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  'd': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  'e': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  'f': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  'g': ['a', 'b', 'c', 'd', 'e', 'f', 'g']
};

const convertStringToArray = (input: string): string[] => {
  return input.split(' ');
};

const normalizeString = (input: string): string => {
  return input.split('').sort().join('')
}

const findStringsOfLength = (array: string[], stringLength: number): string | null => {
  const stringsOfLength = array.filter(word => word.length === stringLength);
  return stringsOfLength.length > 0 ? stringsOfLength[0] : null
};

const twoSegment = (input: string[], output: string[]): string[] => {
  return [
    ...findStringsOfLength(input, 2),
    ...findStringsOfLength(output, 2)
  ]
};

const updatePossibilityGraph = (possibilityGraph: string[], uniqueResult: string): void => {
  const uniqueDigitSignals: string[] = uniqueResult.split('')
};

// Now load input
const signals: string[][] = loadInput()
signals.forEach(signal => {
  const [input, output] = signal;

  const signalInput: string[] = convertStringToArray(input).map(normalizeString)
  console.log(signalInput)
  const signalOutput: string[] = convertStringToArray(output).map(normalizeString)
  console.log(signalOutput)
  const signalCombined: string[] = [...signalInput, ...signalOutput];
  console.log(signalCombined)

  // Call the function and log the results
  const twoSegmentResults = twoSegment(signalInput, signalOutput);
  console.log('Two-Segment Digits in Signals:', twoSegmentResults);

  if (twoSegmentResults.length > 0) {
    updatePossibilityGraph(twoSegmentResults);
  }
});