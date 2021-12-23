import { loadInput } from './load.js'
import { rebuildBeaconMap } from './rebuild-beacon-map.js'

const scanners = loadInput()

rebuildBeaconMap(scanners)

for (const scanner of scanners) {
  console.log(scanner.name, scanner.position?.toJS())
}
const maxDistance = scanners
  .toSeq()
  .flatMap((left) => scanners.toSeq().map((right) => [left, right] as const))
  .map(([left, right]) => left.calculateManhattanDistance(right))
  .max()

console.log('max distance', maxDistance)
