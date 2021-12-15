import { readFileSync } from 'fs'
import { List, Seq } from 'immutable'

export type RiskMap = List<List<number>>
export function loadInput(): RiskMap {
  return Seq(readFileSync('input', { encoding: 'utf-8' }).split('\n'))
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => Seq(line.split('')).map(Number).toList())
    .toList()
}
