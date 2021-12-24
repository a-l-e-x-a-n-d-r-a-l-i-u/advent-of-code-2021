import { List } from 'immutable'
import { allPointsIncludingPoint, Point, PointFactory } from './Point.js'

function pointToKey(point: Point): string {
  return `${point.x},${point.y}`
}

export class InfiniteImage {
  #points = new Map<string, { point: Point; on: boolean }>()

  currentDefault = false

  constructor(startImage?: List<List<boolean>>) {
    if (startImage) {
      for (const [y, row] of startImage.entries()) {
        for (const [x, value] of row.entries()) {
          const point = PointFactory({ x, y })
          if (value) {
            this.setPointOn(point)
          } else {
            this.setPointOff(point)
          }
        }
      }
    }
  }

  public get litPoints(): number {
    let count = 0
    for (const point of this.#points.values()) {
      if (point.on) {
        count += 1
      }
    }
    return count
  }

  public setPointOn(point: Point): void {
    this.setPoint(point, true)
  }

  public setPointOff(point: Point): void {
    this.setPoint(point, false)
  }

  public setPoint(point: Point, on: boolean): void {
    const key = pointToKey(point)
    this.#points.set(key, { point, on })
  }

  public *everyInterestingPoint(): Generator<{ point: Point; surrounding: boolean[] }, void> {
    const currentPointMap = new Map(this.#points)
    const { currentDefault } = this
    const currentIteratedPoints = new Set<string>()
    for (const { point: knownTruePoint } of currentPointMap.values()) {
      for (const touchingPoint of allPointsIncludingPoint(knownTruePoint)) {
        if (!currentIteratedPoints.has(pointToKey(touchingPoint))) {
          yield {
            point: touchingPoint,
            surrounding: [...allPointsIncludingPoint(touchingPoint)].map((surroundingPoint) => {
              const pointValue = currentPointMap.get(pointToKey(surroundingPoint))
              if (pointValue == null) {
                return currentDefault
              }
              return pointValue.on
            }),
          }
          currentIteratedPoints.add(pointToKey(touchingPoint))
        }
      }
    }
  }

  public printImage(): void {
    let minX = Number.POSITIVE_INFINITY
    let maxX = Number.NEGATIVE_INFINITY
    let minY = Number.POSITIVE_INFINITY
    let maxY = Number.NEGATIVE_INFINITY

    for (const { point } of this.#points.values()) {
      minX = Math.min(minX, point.x)
      maxX = Math.max(maxX, point.x)
      minY = Math.min(minY, point.y)
      maxY = Math.max(maxY, point.y)
    }
    console.log(minX, maxX, minY, maxY)
    for (let y = minY; y <= maxY; y += 1) {
      for (let x = minX; x <= maxX; x += 1) {
        const output = this.#points.get(`${x},${y}`)?.on ? '#' : '.'
        process.stdout.write(output)
      }
      process.stdout.write('\n')
    }
  }
}
