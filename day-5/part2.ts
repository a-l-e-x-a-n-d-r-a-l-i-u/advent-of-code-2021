import { loadInput } from './common.js'
import { Grid } from './Grid.js'
import { Point } from './Point.js'
import { Vector } from './Vector.js'

const allVectors = loadInput()

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
  let { x, y } = vector.start
  let hitEndPoint = false // im sure there is a smarter way to do this, but the beer has settled in 🍻
  while (!hitEndPoint) {
    yield new Point(x, y)
    hitEndPoint = true
    if (x !== vector.end.x) {
      hitEndPoint = false
      x = moveTowards(x, vector.end.x)
    }
    if (y !== vector.end.y) {
      hitEndPoint = false
      y = moveTowards(y, vector.end.y)
    }
  }
}

const grid = new Grid()

for (const vector of allVectors) {
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
