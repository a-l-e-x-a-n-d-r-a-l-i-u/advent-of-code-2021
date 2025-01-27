import { normalizedSignals } from './parser.js';

const correctSegments: { [key: number]: string } = {
  0: 'abcefg',
  1: 'cf',
  2: 'acdeg',
  3: 'acdfg',
  4: 'bcdf',
  5: 'abdfg',
  6: 'abdefg',
  7: 'acf',
  8: 'abcdefg',
  9: 'abcdfg'
};

const possibilityGraph: { [key: string]: string } = {
  'a': 'abcdefg',
  'b': 'abcdefg',
  'c': 'abcdefg',
  'd': 'abcdefg',
  'e': 'abcdefg',
  'f': 'abcdefg',
  'g': 'abcdefg',
};

function updatePossibilityGraph(normalizedSignals: any[], graph: { [key: string]: string }) {
  normalizedSignals.forEach(signal => {
    // Iterate through each input string in the signal
    signal.input.forEach(input => {
      // If the input has exactly 2 letters, update the corresponding segments in the graph
      if (input.length === correctSegments[1].length) {
        // Loop through each character in the 2-letter input string
        input.split('').forEach(char => {
          if (graph.hasOwnProperty(char)) {
            graph[char] = correctSegments[1];  // Update the possibility for 'c' and 'f' dynamically
          }
        });
      }
    });
  });

  return graph;
}

// Example usage:
const updatedGraph = updatePossibilityGraph(normalizedSignals, possibilityGraph);
console.log(updatedGraph);