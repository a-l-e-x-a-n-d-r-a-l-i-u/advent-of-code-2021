import { loadInput } from './parser.js';
import { createGridMap, addVectorPoints, countOfOverlaps } from './Grid.js';
import { Vector } from './Vector.js';

// Load all vectors from the input
const allVectors: Vector[] = loadInput();

// Create the initial empty grid map
const initialGrid = createGridMap();

// Process each vector immutably by reducing over the list of vectors
const updatedGrid = allVectors.reduce((grid, vector) => {
  return addVectorPoints(grid, vector); // Add vector points to the grid map
}, initialGrid); // Start with the initial grid map

// Count the overlaps in the updated grid map
const overlapCount = countOfOverlaps(updatedGrid);

console.log('total overlaps', overlapCount);
