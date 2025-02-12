import { normalizedSignals } from './parser.js';

function decodeDisplay(signals: { input: string[]; output: string[] }[]): number {
  // Create a mapping for each digit
  const digitMap: { [key: string]: number } = {};

  // Destructure input and output from signals
  const { input, output } = signals[0];

  console.log("Input: ", input);
  console.log("Output: ", output);

  // Find digits with unique segment counts
  const one = input.find(p => p.length === 2)!;  // 1
  const four = input.find(p => p.length === 4)!; // 4
  const seven = input.find(p => p.length === 3)!; // 7
  const eight = input.find(p => p.length === 7)!; // 8

  console.log("One: ", one);
  console.log("Four: ", four);
  console.log("Seven: ", seven);
  console.log("Eight: ", eight);

  // Map unique lengths to their digits
  digitMap[one] = 1;
  digitMap[four] = 4;
  digitMap[seven] = 7;
  digitMap[eight] = 8;

  console.log("Digit Map after unique segment digits: ", digitMap);

  // Group by segment count to identify other digits
  const fiveSegments = input.filter(p => p.length === 5); // 2, 3, 5
  const sixSegments = input.filter(p => p.length === 6); // 0, 6, 9

  console.log("Five Segment Digits: ", fiveSegments);
  console.log("Six Segment Digits: ", sixSegments);

  // Find 3: overlaps fully with 1
  const three = fiveSegments.find(p => one.split("").every(segment => p.includes(segment)))!;
  digitMap[three] = 3;
  console.log("Three: ", three)

  // Find 9: overlaps fully with 4
  const nine = sixSegments.find(p => four.split("").every(segment => p.includes(segment)))!;
  digitMap[nine] = 9;
  console.log("Nine:", nine)

  // Find 0: overlaps fully with 1 but is not 9
  const zero = sixSegments.find(p => p !== nine && one.split("").every(segment => p.includes(segment)))!;
  digitMap[zero] = 0;
  console.log("Zero: ", zero)

  // Find 6: the remaining 6-segment digit
  const six = sixSegments.find(p => p !== nine && p !== zero)!;
  digitMap[six] = 6;
  console.log("Six:", six)

  // Find 5: fully contained in 6
  const five = fiveSegments.find(p => p.split("").every(segment => six.includes(segment)))!;
  digitMap[five] = 5;
  console.log("Five: ", five)

  // Find 2: the remaining 5-segment digit
  const two = fiveSegments.find(p => p !== three && p !== five)!;
  digitMap[two] = 2;
  console.log("Two: ", two)

  console.log("Final Digit Map: ", digitMap);

  // Decode the output
  const decodedOutput = output.map(o => {
    const digit = digitMap[o];
    console.log(`Mapping ${o} -> ${digit}`);
    return digit;
  });

  console.log("Decoded Output: ", decodedOutput);

  // Combine digits into a single number
  const finalNumber = parseInt(decodedOutput.join(""), 10);
  console.log("Final Number: ", finalNumber);

  return finalNumber;
}

const result = decodeDisplay(normalizedSignals);
console.log("Result: ", result); // Output the decoded 4-digit number
