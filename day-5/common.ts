import { readFileSync } from 'fs'
import { Point } from './Point.js'
import { Vector } from './Vector.js'

export function loadInput(): Vector[] {
  const allLines = readFileSync('input', { encoding: 'utf-8' })
    .split('\n')
    .filter((line) => line.length > 0)
  return allLines.map(parseVector)
}
function parsePoint(pointAsString: string): Point {
  const points = pointAsString.split(',').map(Number)
  if (points.length !== 2) {
    throw new Error('points can only have two numbers')
  }
  return new Point(points[0], points[1])
}

function parseVector(vectorAsString: string): Vector {
  const parts = vectorAsString.split(' -> ')
  if (parts.length !== 2) {
    throw new Error('vector does not contain two points')
  }
  const points = parts.map(parsePoint)
  return new Vector(points[0], points[1])
}
