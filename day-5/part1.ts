import { loadInput } from './common.js'
import { Grid } from './Grid.js'
import { Point } from './Point.js'
import { Vector } from './Vector.js'

const allVectors = loadInput()

const straightLineVectors = allVectors.filter(
  (vector) => vector.start.x === vector.end.x || vector.start.y === vector.end.y,
)

function moveTowards(current: number, end: number): number {
  if (current < end) {
    return current + 1
  }
  if (current > end) {
    return current - 1
  }
  return current
}
function* pointsAlongVector(vector: Vector): Generator<Point, void> {
  const xStart = Math.min(vector.start.x, vector.end.x)
  const xEnd = Math.max(vector.start.x, vector.end.x)
  const yStart = Math.min(vector.start.y, vector.end.y)
  const yEnd = Math.max(vector.start.y, vector.end.y)
  for (let x = xStart; x <= xEnd; x += 1) {
    for (let y = yStart; y <= yEnd; y += 1) {
      yield new Point(x, y)
    }
  }
}

const grid = new Grid()

for (const vector of straightLineVectors) {
  console.log('calculating path of vector', vector.toString())
  const points = pointsAlongVector(vector)
  for (const point of points) {
    // console.log('marking point', point.asKey)
    const data = grid.getPointData(point)
    data.countOfOverlaps += 1
    grid.setPointData(point, data)
  }
}

const totalOverlaps = [...grid.allPointDatas()].filter((pointData) => pointData.countOfOverlaps > 1).length

console.log('total overlaps', totalOverlaps)
