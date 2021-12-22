import { readFileSync } from 'fs'
import { List, Seq } from 'immutable'
import { BeaconFactory } from './Beacon.js'
import { Scanner } from './Scanner.js'

export function loadInput(file = 'input'): List<Scanner> {
  return Seq(readFileSync(file, { encoding: 'utf-8' }).split('\n\n'))
    .map((section) => section.trim())
    .filter((section) => section.length > 0)
    .map((section) => {
      const lines = Seq(section.split('\n')).map((line) => line.trim())
      const scannerName = lines.first()
      if (!scannerName) {
        throw new Error('invalid scanner name')
      }
      const beacons = lines
        .skip(1)
        .map((line) => {
          const coords = Seq(line.split(',')).map(Number)
          if (coords.size !== 3) {
            throw new Error('invalid beacon coords')
          }
          return BeaconFactory({
            x: coords.get(0),
            y: coords.get(1),
            z: coords.get(2),
          })
        })
        .toSet()
      return new Scanner(scannerName, beacons)
    })
    .toList()
}
