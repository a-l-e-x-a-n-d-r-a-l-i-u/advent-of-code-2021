import { Record } from 'immutable'

export const PointFactory = Record(
  {
    x: 0,
    y: 0,
  },
  'Point',
)
export type Point = ReturnType<typeof PointFactory>

export function* allPointsIncludingPoint(point: Point): Generator<Point, void> {
  for (let y = -1; y <= 1; y += 1) {
    for (let x = -1; x <= 1; x += 1) {
      yield PointFactory({
        x: point.x + x,
        y: point.y + y,
      })
    }
  }
}
