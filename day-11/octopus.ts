type Point = readonly [number, number]
export function calculateATick(grid: number[][]): number {
  const flashed: Point[] = []
  for (const y of grid.keys()) {
    for (const x of grid[y].keys()) {
      grid[y][x] += 1
      const point: Point = [x, y]
      flashed.push(...checkIfFlashed(grid, point))
    }
  }

  for (const flashedPoint of flashed) {
    const [x, y] = flashedPoint
    grid[y][x] = 0
  }
  return flashed.length
}

function pointInRange(point: Point): boolean {
  const [x, y] = point
  return x >= 0 && x < 10 && y >= 0 && y < 10
}
function checkIfFlashed(grid: number[][], point: Point): Point[] {
  const [x, y] = point
  if (grid[y][x] === 10) {
    const flashed = [point]
    const leftX = x - 1
    const rightX = x + 1
    const topY = y - 1
    const bottomY = y + 1
    const increasingPoints: Point[] = (
      [
        [leftX, topY],
        [leftX, y],
        [leftX, bottomY],
        [x, topY],
        [x, bottomY],
        [rightX, topY],
        [rightX, y],
        [rightX, bottomY],
      ] as Point[]
    ).filter(pointInRange)
    for (const increasingPoint of increasingPoints) {
      grid[increasingPoint[1]][increasingPoint[0]] += 1
      flashed.push(...checkIfFlashed(grid, increasingPoint))
    }

    return flashed
  }
  return []
}
