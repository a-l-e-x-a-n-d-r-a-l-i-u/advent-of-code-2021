import { normalizedSignals } from './parser.js';

const test = [
  {
    input: ["acedgfb", "cdfbe", "gcdfa", "fbcad", "dab", "cefabd", "cdfgeb", "eafb", "cagedb", "ab"],
    output: ["cdfeb", "fcadb", "cdfeb", "cdbaf"],
  },
];

function decodeDisplay(signals: { input: string[]; output: string[] }[]): number {
  // Create a mapping for each digit
  const digitMap: { [key: string]: number } = {};

  // Destructure input and output from signals
  const { input, output } = signals[0];

  // Find digits with unique segment counts
  const one = input.find(p => p.length === 2)!;  // 1
  const four = input.find(p => p.length === 4)!; // 4
  const seven = input.find(p => p.length === 3)!; // 7
  const eight = input.find(p => p.length === 7)!; // 8

  // Map unique lengths to their digits
  digitMap[one] = 1;
  digitMap[four] = 4;
  digitMap[seven] = 7;
  digitMap[eight] = 8;

  // Group by segment count to identify other digits
  const fiveSegments = input.filter(p => p.length === 5); // 2, 3, 5
  const sixSegments = input.filter(p => p.length === 6); // 0, 6, 9

  // Find 3: overlaps fully with 1
  const three = fiveSegments.find(p => one.split("").every(segment => p.includes(segment)))!;
  digitMap[three] = 3;

  // Find 9: overlaps fully with 4
  const nine = sixSegments.find(p => four.split("").every(segment => p.includes(segment)))!;
  digitMap[nine] = 9;

  // Find 0: overlaps fully with 1 but is not 9
  const zero = sixSegments.find(p => p !== nine && one.split("").every(segment => p.includes(segment)))!;
  digitMap[zero] = 0;

  // Find 6: the remaining 6-segment digit
  const six = sixSegments.find(p => p !== nine && p !== zero)!;
  digitMap[six] = 6;

  // Find 5: fully contained in 6
  const five = fiveSegments.find(p => p.split("").every(segment => six.includes(segment)))!;
  digitMap[five] = 5;

  // Find 2: the remaining 5-segment digit
  const two = fiveSegments.find(p => p !== three && p !== five)!;
  digitMap[two] = 2;

  // Reverse the digitMap for decoding the output
  const segmentToDigit: { [key: string]: number } = {};
  for (const [pattern, digit] of Object.entries(digitMap)) {
    segmentToDigit[pattern] = digit;
  }

  // Sort output segments and decode the output digits
  const sortedOutput = output.map(o => o.split('').sort().join(''));
  const decodedOutput = sortedOutput.map(o => segmentToDigit[o]);

  // Combine digits into a single number
  return parseInt(decodedOutput.join(""), 10);
}

const result = decodeDisplay(test);
console.log(result); // Output the decoded 4-digit number