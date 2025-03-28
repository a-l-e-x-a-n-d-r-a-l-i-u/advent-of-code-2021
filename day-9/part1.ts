import { loadInput } from './load.js'

/* Algorithm:

1) Iterate over each element in the grid.
2) Compare it with its adjacent neighbours (up, down, left, right).
3) If it's smaller than all its neighbours, it's a local minimum.

*/

const input = loadInput()
type Point = [number, number]; // this is a tuple!

const findNeighbors = (grid: number[][], point: Point): Point[] => {
  const [x, y] = point;
  const neighbors: Point[] = [];

  if (x > 0) neighbors.push([x - 1, y]); // Left
  if (x < grid[0].length - 1) neighbors.push([x + 1, y]); // Right
  if (y > 0) neighbors.push([x, y - 1]); // Up
  if (y < grid.length - 1) neighbors.push([x, y + 1]); // Down

  return neighbors;
};

const compareWithNeighbors = (
  grid: number[][], 
  point: Point, 
  compareFn: (value: number, neighbor: number) => boolean
): boolean => {
  const value = grid[point[1]][point[0]];
  const neighbors = findNeighbors(grid, point);
  
  return neighbors.every(([nx, ny]) => compareFn(value, grid[ny][nx]));
};

// A flexible function that checks if a point is a local minimum
const isLocalMinimum = (grid: number[][], point: Point): boolean => {
  return compareWithNeighbors(grid, point, (value, neighbor) => value < neighbor);
};

// A flexible function that checks if a point is a local maximum
const isLocalMaximum = (grid: number[][], point: Point): boolean => {
  return compareWithNeighbors(grid, point, (value, neighbor) => value > neighbor);
};

// Find local minima or maxima (generalized function)
const findExtrema = (
  grid: number[][], 
  checkFn: (grid: number[][], point: Point) => boolean
): [number, number, number][] => {
  const rows = grid.length;
  const cols = grid[0].length;
  const extrema: [number, number, number][] = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const point: Point = [j, i];
      if (checkFn(grid, point)) {
        extrema.push([j, i, grid[i][j]]);
      }
    }
  }

  return extrema;
};

// Example grid
const grid: number[][] = [
  [2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
  [3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
  [9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
  [8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
  [9, 8, 9, 9, 9, 6, 5, 6, 7, 8]
];

// Running the functions to get local minima and maxima
const localMinima = findExtrema(grid, isLocalMinimum);
const localMaxima = findExtrema(grid, isLocalMaximum);

console.log("Local Minima:", localMinima);
console.log("Local Maxima:", localMaxima);
