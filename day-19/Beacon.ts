import { Record, Set } from 'immutable'

export const BeaconFactory = Record(
  {
    x: 0,
    y: 0,
    z: 0,
  },
  'Beacon',
)
export type Beacon = ReturnType<typeof BeaconFactory>

export function normaliseBeacon(from: Beacon, to: Beacon): Beacon {
  return BeaconFactory({
    x: from.x - to.x,
    y: from.y - to.y,
    z: from.z - to.z,
  })
}

export function normaliseAllBeacons(beacons: Set<Beacon>, normalBeacon: Beacon): Set<Beacon> {
  return beacons.map((scannerBeacon) => normaliseBeacon(scannerBeacon, normalBeacon))
}

export function addBeacons(from: Beacon, to: Beacon): Beacon {
  return BeaconFactory({
    x: from.x + to.x,
    y: from.y + to.y,
    z: from.z + to.z,
  })
}

export function addAllBeacons(beacons: Set<Beacon>, addBeacon: Beacon): Set<Beacon> {
  return beacons.map((scannerBeacon) => addBeacons(scannerBeacon, addBeacon))
}
