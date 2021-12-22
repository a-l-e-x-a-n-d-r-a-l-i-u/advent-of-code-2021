import { test, expect } from '@jest/globals'
import { loadInput } from './load.js'
import { rebuildBeaconMap } from './rebuild-beacon-map.js'

test('test example', () => {
  const input = loadInput('example')

  const realBeacons = rebuildBeaconMap(input)

  expect(realBeacons.size).toBe(79)
})
