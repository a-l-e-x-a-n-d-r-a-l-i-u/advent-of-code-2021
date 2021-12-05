import { Point } from './Point.js'

export class Vector {
  constructor(public start: Point, public end: Point) {}

  public toString(): string {
    return `${this.start.asKey} -> ${this.end.asKey}`
  }
}
