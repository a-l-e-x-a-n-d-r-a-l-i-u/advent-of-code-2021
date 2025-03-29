import { loadInput } from './load.js'

/* Algorithm:

1) Iterate over each element in the grid.
2) Compare it with its adjacent neighbours (up, down, left, right).
3) If it's smaller than all its neighbours, it's a local minimum.

*/

const grid = loadInput()

function findLocalMinima(grid: number[][]): [number, number, number][] {
    const rows = grid.length;
    const columns = grid[0].length;
    const localMinima: [number, number, number][] = []; // [X, Y, value]

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
            const value = grid[y][x];
            const neighbors: number[] = [];

            if (y > 0) neighbors.push(grid[y - 1][x]); // Up
            if (y < rows - 1) neighbors.push(grid[y + 1][x]); // Down
            if (x > 0) neighbors.push(grid[y][j - 1]); // Left
            if (x < columns - 1) neighbors.push(grid[y][x + 1]); // Right

            if (neighbors.every(neighbor => value < neighbor)) {
                localMinima.push([y, x, value]);
            }
        }
    }

    return localMinima;
}

console.log(findLocalMinima(grid));
