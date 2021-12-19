import { readFileSync } from 'fs'

export interface Area {
  minX: number
  maxX: number
  minY: number
  maxY: number
}
const AREA_REGEX = /target area: x=(-?\d+)..(-?\d+), y=(-?\d+)..(-?\d+)/

export function loadInput(file = 'input'): Area {
  const rawInput = readFileSync(file, { encoding: 'utf-8' }).trim()
  const parsedInput = AREA_REGEX.exec(rawInput)
  if (!parsedInput) {
    throw new Error('invalid input')
  }
  return {
    minX: Number(parsedInput.at(1)),
    maxX: Number(parsedInput.at(2)),
    minY: Number(parsedInput.at(3)),
    maxY: Number(parsedInput.at(4)),
  }
}
