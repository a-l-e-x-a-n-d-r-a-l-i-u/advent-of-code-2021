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
  if (importantLines.size !== 2) {
    throw new Error('invalid input')
  }

  let currentRoomLocation = 11
  for (const roomIndex of [0, 1, 2, 3]) {
    for (const line of importantLines) {
      const type = line[roomIndex] as keyof AmphipodHallwayStart
      hallway[type].push(currentRoomLocation)
      currentRoomLocation += 1
    }
  }
  return Object.fromEntries(Object.entries(hallway).map(([k, v]) => [k, List(v)])) as unknown as AmphipodHallwayStart
}
