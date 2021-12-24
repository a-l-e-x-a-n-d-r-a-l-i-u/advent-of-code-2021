import { readFileSync } from 'fs'
import { List, Seq } from 'immutable'

export interface Player {
  name: string
  startingPosition: number
}
const LINE_REGEX = /Player (\w+) starting position: (\d+)/
export function loadInput(file = 'input'): List<Player> {
  return Seq(readFileSync(file, { encoding: 'utf-8' }).split('\n'))
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const parsedLine = LINE_REGEX.exec(line)
      if (!parsedLine) {
        throw new Error('invalid line')
      }
      return {
        name: parsedLine.at(1) || 'unknown player',
        startingPosition: Number(parsedLine.at(2)),
      }
    })
    .toList()
}
