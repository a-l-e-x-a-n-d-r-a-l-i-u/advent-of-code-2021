import { List, Set } from 'immutable'
import { addAllBeacons, Beacon, BeaconFactory, normaliseBeacon } from './Beacon.js'
import { Scanner } from './Scanner.js'

export function rebuildBeaconMap(scanners: List<Scanner>): Set<Beacon> {
  const firstScanner = scanners.first()!
  firstScanner.position = BeaconFactory({ x: 0, y: 0, z: 0 })
  let unknownScanners = scanners.skip(1)
  let knownRealBeacons = firstScanner.beacons
  let unsearchedBeacons = knownRealBeacons

  while (unknownScanners.size > 0) {
    const beaconsToSearch = unsearchedBeacons
    let newRealBeacons = Set<Beacon>()
    for (const scanner of unknownScanners) {
      console.log('testing', scanner.name, 'against', beaconsToSearch.size, 'other beacons')
      const mergableBeacons = detectIfBeaconsMergable(beaconsToSearch, scanner)
      if (mergableBeacons) {
        console.log('scanner', scanner.name, 'merged')
        knownRealBeacons = knownRealBeacons.merge(mergableBeacons)
        unknownScanners = unknownScanners.delete(unknownScanners.indexOf(scanner))
        newRealBeacons = newRealBeacons.merge(mergableBeacons)
      }
    }
    unsearchedBeacons = newRealBeacons
    if (newRealBeacons.isEmpty()) {
      throw new Error(`cannot merge remaining ${unknownScanners.size} scanners`)
    }
  }

  return knownRealBeacons
}

function detectIfBeaconsMergable(knownBeacons: Set<Beacon>, scanner: Scanner): Set<Beacon> | null {
  for (const testBeacons of scanner.getBeaconsInEachRotation()) {
    for (const testBeacon of testBeacons) {
      const testBeaconsNormalisedToCurrentTest = scanner.getBeaconsNormalised(testBeacons, testBeacon)
      for (const knownBeacon of knownBeacons) {
        const potentiallyFixedBeacons = addAllBeacons(testBeaconsNormalisedToCurrentTest, knownBeacon)
        if (potentiallyFixedBeacons.intersect(knownBeacons).size >= 12) {
          // match
          const scannerPoint = normaliseBeacon(knownBeacon, testBeacon)
          console.log(scanner.name, 'at', scannerPoint.toJSON())
          console.log('overlaped points', potentiallyFixedBeacons.intersect(knownBeacons).toJS())
          scanner.position = scannerPoint
          return potentiallyFixedBeacons
        }
      }
    }
  }
  return null
}
