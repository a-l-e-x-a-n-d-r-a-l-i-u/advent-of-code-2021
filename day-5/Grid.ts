import { Point, PointAsKey } from './Point.js'
import { Vector } from './Vector.js'

interface PointData {
  countOfOverlaps: number
}

export class Grid {
  private gridMap = new Map<PointAsKey, PointData>()

  public getPointData(point: Point): PointData {
    let pointData = this.gridMap.get(point.asKey)
    if (pointData) {
      return pointData
    }
    pointData = { countOfOverlaps: 0 }
    this.gridMap.set(point.asKey, pointData)
    return pointData
  }

  public setPointData(point: Point, data: PointData): void {
    this.gridMap.set(point.asKey, data)
  }

  public allPointDatas(): IterableIterator<PointData> {
    return this.gridMap.values()
  }

  public addVectorPoints(vector: Vector): void {
    console.log('calculating path of vector', vector.toString())
    for (const point of vector.allPointsBetween()) {
      // console.log('marking point', point.asKey)
      const data = this.getPointData(point)
      data.countOfOverlaps += 1
      this.setPointData(point, data) //this is probs a noop (because of references)
    }
  }

  public get countOfOverlaps(): number {
    let totalOverlaps = 0
    for (const data of this.gridMap.values()) {
      if (data.countOfOverlaps > 1) {
        totalOverlaps += 1
      }
    }
    return totalOverlaps
  }
}
