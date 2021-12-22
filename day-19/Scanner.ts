import { Set } from 'immutable'
import { Beacon, normaliseAllBeacons } from './Beacon.js'

export class Scanner {
  private rotationCache = new Map<string, Set<Beacon>>()

  private normaliseCache = new Map<string, Set<Beacon>>()

  constructor(public readonly name: string, public readonly beacons: Set<Beacon>) {}

  public getBeaconsNormalised(beacons: Set<Beacon>, normalBeacon: Beacon): Set<Beacon> {
    const cacheKey = `${JSON.stringify(beacons)} | ${JSON.stringify(normalBeacon)}`
    let result = this.normaliseCache.get(cacheKey)
    if (!result) {
      result = normaliseAllBeacons(beacons, normalBeacon)
      this.normaliseCache.set(cacheKey, result)
    }
    return result
  }

  public *getBeaconsInEachRotation(): Generator<Set<Beacon>, void> {
    const everyAxis = ['x', 'y', 'z'] as const
    for (const axis of everyAxis) {
      for (const direction of [1, -1] as const) {
        for (const rotation of [0, 90, 180, 270] as const) {
          const cacheKey = `${axis},${direction},${rotation}`
          const cachedValue = this.rotationCache.get(cacheKey)
          if (cachedValue) {
            yield cachedValue
          } else {
            const beacons = this.calculateRotation(axis, direction, rotation)
            this.rotationCache.set(cacheKey, beacons)
            yield beacons
          }
        }
      }
    }
  }

  private calculateRotation(axis: 'x' | 'y' | 'z', direction: -1 | 1, rotation: 0 | 90 | 180 | 270): Set<Beacon> {
    return this.beacons.map((beacon) =>
      beacon.withMutations((mutableBeacon) => {
        mutableBeacon.set('x', beacon.get(axis) * direction)
        const otherAxis0 = this.shiftAxis(axis)
        const otherAxis1 = this.shiftAxis(otherAxis0)
        const rotateValue0 = beacon.get(otherAxis0) * direction
        const rotateValue1 = beacon.get(otherAxis1)
        if (rotation === 0) {
          mutableBeacon.set('y', rotateValue0)
          mutableBeacon.set('z', rotateValue1)
        } else if (rotation === 90) {
          mutableBeacon.set('z', rotateValue0)
          mutableBeacon.set('y', -rotateValue1)
        } else if (rotation === 180) {
          mutableBeacon.set('y', -rotateValue0)
          mutableBeacon.set('z', -rotateValue1)
        } else if (rotation === 270) {
          mutableBeacon.set('z', -rotateValue0)
          mutableBeacon.set('y', rotateValue1)
        }
      }),
    )
  }

  private shiftAxis(axis: 'x' | 'y' | 'z'): 'x' | 'y' | 'z' {
    if (axis === 'x') {
      return 'y'
    }
    if (axis === 'y') {
      return 'z'
    }
    if (axis === 'z') {
      return 'x'
    }
    throw new Error('axis not real')
  }
}
