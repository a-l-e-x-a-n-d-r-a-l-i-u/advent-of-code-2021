import { readFileSync } from 'fs'
import { List, Seq } from 'immutable'

export type RawCell = '.' | '>' | 'v'
export function loadInput(file = 'input'): List<List<RawCell>> {
  return Seq(readFileSync(file, { encoding: 'utf-8' }).split('\n'))
    .map((line) => line.trim())
    .filter((line, _, wholeFile) => line.length === wholeFile.first()?.length)
    .map((line) =>
      Seq(line.split(''))
        .map((char) => {
          if (char !== '.' && char !== '>' && char !== 'v') {
            throw new Error(`invalid input character ${char}`)
          }
          return char as RawCell
        })
        .toList(),
    )
    .toList()
}
