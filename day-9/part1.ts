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
    const localMinima: [number, number, number][] = []; // [row, column, value]

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const value = grid[i][j];
            const neighbors: number[] = [];

            if (i > 0) neighbors.push(grid[i - 1][j]); // Up
            if (i < rows - 1) neighbors.push(grid[i + 1][j]); // Down
            if (j > 0) neighbors.push(grid[i][j - 1]); // Left
            if (j < columns - 1) neighbors.push(grid[i][j + 1]); // Right

            if (neighbors.every(neighbor => value < neighbor)) {
                localMinima.push([i, j, value]);
            }
        }
    }

    return localMinima;
}

console.log(findLocalMinima(grid));
