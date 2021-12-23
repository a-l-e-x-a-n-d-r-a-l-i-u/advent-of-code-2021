import { test, expect } from '@jest/globals'
import { Seq, Set } from 'immutable'
import { BeaconFactory } from './Beacon.js'
import { loadInput } from './load.js'
import { Scanner } from './Scanner.js'

test('test rotation matches', () => {
  const scanner1 = new Scanner('1', Set())
  scanner1.position = BeaconFactory({ x: 1105, y: -1205, z: 1229 })
  const scanner2 = new Scanner('2', Set())
  scanner2.position = BeaconFactory({ x: -92, y: -2380, z: -20 })
  expect(scanner1.calculateManhattanDistance(scanner2)).toBe(3621)
})
