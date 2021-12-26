import { readFileSync } from 'fs'
import { List, Seq } from 'immutable'
import { Point, PointFactory } from './Point.js'

export interface CuboidStep {
  operation: 'on' | 'off'
  minimum: Point
  maximum: Point
}
const LINE_REGEX = /(on|off) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)/
export function loadInput(file = 'input'): List<CuboidStep> {
  return Seq(readFileSync(file, { encoding: 'utf-8' }).split('\n'))
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const parsedLine = LINE_REGEX.exec(line)
      if (!parsedLine) {
        throw new Error('invalid line')
      }
      const operation = parsedLine.at(1) as 'on' | 'off' | undefined
      if (operation == null || (operation !== 'on' && operation !== 'off')) {
        throw new Error('invalid operation')
      }
      const minX = Number(parsedLine.at(2))
      const maxX = Number(parsedLine.at(3))
      const minY = Number(parsedLine.at(4))
      const maxY = Number(parsedLine.at(5))
      const minZ = Number(parsedLine.at(6))
      const maxZ = Number(parsedLine.at(7))
      const minimum = PointFactory({ x: minX, y: minY, z: minZ })
      const maximum = PointFactory({ x: maxX, y: maxY, z: maxZ })
      return {
        operation,
        minimum,
        maximum,
      }
    })
    .toList()
}
