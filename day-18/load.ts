import { readFileSync } from 'fs'
import { List, Seq } from 'immutable'
import { SnailfishNumber } from './snailfish-math.js'

export function loadInput(file = 'input'): List<SnailfishNumber> {
  return Seq(readFileSync(file, { encoding: 'utf-8' }).split('\n'))
    .filter((line) => line.length > 0)
    .map((line) => JSON.parse(line) as SnailfishNumber)
    .toList()
}
