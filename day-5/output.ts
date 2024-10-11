import { loadInput } from './parser.js';
import { processVectors } from './Grid.js';
import { Vector } from './Vector.js';

// Load vectors from input
const allVectors: Vector[] = loadInput();
const straightLineVectors: Vector[] = allVectors.filter(
  (vector) => vector.start.x === vector.end.x || vector.start.y === vector.end.y
);

console.log('Total overlaps among straight lines:', processVectors(straightLineVectors));
console.log('Total overlaps including diagonal lines:', processVectors(allVectors));