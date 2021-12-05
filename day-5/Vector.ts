import { Point } from './Point.js'

function moveTowards(current: number, end: number): number {
  if (current < end) {
    return current + 1
  }
  if (current > end) {
    return current - 1
  }
  return current
}

export class Vector {
  constructor(public start: Point, public end: Point) {}

  public toString(): string {
    return `${this.start.asKey} -> ${this.end.asKey}`
  }

  public *allPointsBetween(): Generator<Point, void> {
    let { x, y } = this.start
    let hitEndPoint = false // im sure there is a smarter way to do this, but the beer has settled in 🍻
    while (!hitEndPoint) {
      yield new Point(x, y)
      hitEndPoint = true
      if (x !== this.end.x) {
        hitEndPoint = false
        x = moveTowards(x, this.end.x)
      }
      if (y !== this.end.y) {
        hitEndPoint = false
        y = moveTowards(y, this.end.y)
      }
    }
  }
}
