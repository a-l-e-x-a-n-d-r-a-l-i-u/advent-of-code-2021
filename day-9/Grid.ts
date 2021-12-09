export type Point = [number, number]

export class Grid {
  public readonly maxGridX: number

  public readonly maxGridY: number

  constructor(public readonly grid: number[][]) {
    this.maxGridX = grid[0].length - 1
    this.maxGridY = grid.length - 1
  }

  public findNeighbors(point: Point): Point[] {
    const results: Point[] = []
    if (point[0] !== 0) {
      results.push([point[0] - 1, point[1]]) //left
    }
    if (point[0] !== this.maxGridX) {
      results.push([point[0] + 1, point[1]]) //right
    }
    if (point[1] !== 0) {
      results.push([point[0], point[1] - 1]) //up
    }
    if (point[1] !== this.maxGridY) {
      results.push([point[0], point[1] + 1]) //down
    }
    return results
  }

  public valueAtPoint(point: Point): number {
    return this.grid[point[1]][point[0]]
  }
}
