export type PointAsKey = `${number},${number}`
export class Point {
  constructor(public x: number, public y: number) {}

  public get asKey(): PointAsKey {
    return `${this.x},${this.y}`
  }
}
