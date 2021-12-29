import { readFileSync } from 'fs'
import { List, Seq } from 'immutable'

export type CellState = 'A' | 'B' | 'C' | 'D'
export interface AmphipodHallwayStart {
  A: List<number>
  B: List<number>
  C: List<number>
  D: List<number>
}
export function loadInput(file = 'input'): AmphipodHallwayStart {
  const hallway = {
    A: [] as number[],
    B: [] as number[],
    C: [] as number[],
    D: [] as number[],
  }
  const importantLines = Seq(readFileSync(file, { encoding: 'utf-8' }).split('\n'))
    .map((line) => line.trim())
    .map((line) => line.replaceAll(/[^ABCD]/g, ''))
    .filter((line) => line.length > 0)
    .map((line) => line.split(''))
    .toList()
  if (importantLines.size !== 2 && importantLines.size !== 4) {
    throw new Error('invalid input')
  }

  for (const roomIndex of [0, 1, 2, 3]) {
    for (const [lineIndex, line] of importantLines.entries()) {
      const type = line[roomIndex] as keyof AmphipodHallwayStart
      const currentTopRoomLocation = 11 + roomIndex * 2
      const currentRoomLocation = currentTopRoomLocation + (lineIndex >= 2 ? lineIndex + 6 : lineIndex)
      hallway[type].push(currentRoomLocation)
    }
  }
  return Object.fromEntries(Object.entries(hallway).map(([k, v]) => [k, List(v)])) as unknown as AmphipodHallwayStart
}
