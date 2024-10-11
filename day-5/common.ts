import { readFileSync } from 'fs'
import { createPoint, Point } from './Point.js'
import { createVector, Vector } from './Vector.js'

export function loadInput(): Vector[] {
  const allLines = readFileSync('input', { encoding: 'utf-8' })
    .split('\n')
    .filter((line) => line.length > 0)
  return allLines.map(parseVector)
}

function parsePoint(pointAsString: string): Point {
  const points = pointAsString.split(',').map(Number)
  if (points.length !== 2) {
    throw new Error('Points can only have two numbers')
  }
  return createPoint(points[0], points[1])
}

function parseVector(vectorAsString: string): Vector {
  const parts = vectorAsString.split(' -> ')
  if (parts.length !== 2) {
    throw new Error('Vector does not contain two points')
  }
  const points = parts.map(parsePoint)
  return createVector(points[0], points[1])
}
