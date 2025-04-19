import { loadInput } from './load.js'
import { createGrid, findNeighbors, valueAtPoint } from './Grid.js'

/* Algorithm:

1) Iterate over each element in the grid.
2) Compare it with its adjacent neighbours (up, down, left, right).
3) If it's smaller than all its neighbours, it's a local minimum.

*/

const grid = createGrid(loadInput())
console.log(grid)

function findLocalMinima(grid: number[][]): [number, number, number][] {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const point: Point = [x, y]
      const value = valueAtPoint(grid, point)
      const neighbors = findNeighbors(grid, point).map((neighbor) => ({
        point: neighbor,
        value: valueAtPoint(grid, neighbor),
      }))

      console.log(`Point (${x}, ${y}) = ${value}, Neighbors:`, neighbors)
    }
  }
}

console.log(findLocalMinima(grid));
