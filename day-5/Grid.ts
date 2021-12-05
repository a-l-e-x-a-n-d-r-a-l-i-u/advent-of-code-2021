import { Point, PointAsKey } from './Point.js'

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
}
