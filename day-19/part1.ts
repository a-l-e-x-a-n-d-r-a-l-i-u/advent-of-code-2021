import { loadInput } from './load.js'
import { rebuildBeaconMap } from './rebuild-beacon-map.js'

const input = loadInput()

const realBeacons = rebuildBeaconMap(input)
console.log('found beacons', realBeacons.size)
