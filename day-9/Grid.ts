export type Point = [number, number]
export type Grid = number[][]

export const createGrid = (grid: Grid) => ({
  maxGridX: grid[0].length - 1,
  maxGridY: grid.length - 1,
  grid,
})

export const findNeighbors = (grid: Grid, [x, y]: Point): Point[] => {
  const maxX = grid[0].length - 1
  const maxY = grid.length - 1
  return [
    x > 0 && [x - 1, y], // left
    x < maxX && [x + 1, y], // right
    y > 0 && [x, y - 1], // up
    y < maxY && [x, y + 1], // down
  ].filter(Boolean) as Point[] // filter out undefined
}

export const valueAtPoint = (grid: Grid, [x, y]: Point): number => grid[y][x] // y is the row, x is the column
