import { normalizedSignals } from './parser.js';

function decodeDisplay(signals: { input: string[]; output: string[] }[]): number[] {
  return signals.map(({ input, output }) => {
    const digitMap: { [key: string]: number } = {};

    // Identify unique-length digits
    const one = input.find(phrase => phrase.length === 2)!;
    const four = input.find(phrase => phrase.length === 4)!;
    const seven = input.find(phrase => phrase.length === 3)!;
    const eight = input.find(phrase => phrase.length === 7)!;

    digitMap[one] = 1;
    digitMap[four] = 4;
    digitMap[seven] = 7;
    digitMap[eight] = 8;

    // console.log("Digit Map after finding uniquely lengthed digits: ", digitMap);

    const three = input.filter(phrase => phrase.length === 5)
      .find(phrase => seven.split("").every(letter => phrase.includes(letter)))!; // 3 is a 5-letter phrase that contains 1 or 7
    digitMap[three] = 3;

    const nine = input.filter(phrase => phrase.length === 6)
      .find(phrase => four.split("").every(letter => phrase.includes(letter)))!; // 9 is a 6-letter phrase that contains 4
    digitMap[nine] = 9;

    const zero = input.filter(phrase => phrase.length === 6)
      .find(phrase => phrase !== nine && one.split("").every(letter => phrase.includes(letter)))!; // 0 is a 6-letter phrase that contains 1 and is not 9
    digitMap[zero] = 0;

    const six = input.filter(phrase => phrase.length === 6)
      .find(phrase => phrase !== nine && phrase !== zero)!; // 6 is a 6-letter phrase that is not 9 or 0
    digitMap[six] = 6;

    const five = input.filter(phrase => phrase.length === 5)
      .find(phrase => phrase.split("").every(letter => six.includes(letter)))!; // 5 is a 5-letter phrase that is contained inside 6
    digitMap[five] = 5;

    const two = input.filter(phrase => phrase.length === 5)
      .find(phrase => phrase !== three && phrase !== five)!; // 2 is a 5-letter phrase that is not 3 or 5
    digitMap[two] = 2;

    console.log("Digit Map:", digitMap);


    const decodedOutput = output.map(o => digitMap[o] ?? -1);
    // The -1 is a nullish operator. If digitMap[o] is undefined or null, use -1 instead. It helps with debugging.
    if (decodedOutput.some(num => num === -1)) {
      console.log("Warning: Some outputs were not found in digitMap!");
    }

    return parseInt(decodedOutput.join(""), 10); // 10 just means base 10 (normal decimal numbers).
  });
}

const results = decodeDisplay(normalizedSignals);
const totalSum = results.reduce((sum, num) => sum + num, 0);

console.log("Decoded Outputs:", results);
console.log("Total Sum of All Decoded Outputs:", totalSum);
