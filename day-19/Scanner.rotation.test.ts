import { test, expect } from '@jest/globals'
import { Seq, Set } from 'immutable'
import { loadInput } from './load.js'

test('test rotation matches', () => {
  const scanners = loadInput('rotation_test_input')
  const firstInAllRotations = [...scanners.first()!.getBeaconsInEachRotation()]
  // console.log(firstInAllRotations.map((rotation) => rotation.map((beacon) => beacon.toJSON()).toJSON()))
  for (const otherScanner of scanners) {
    expect(firstInAllRotations).toContainEqual(otherScanner.beacons)
  }
})
