export type Line = 'TopMiddle' | 'TopLeft' | 'TopRight' | 'BottomMiddle' | 'BottomLeft' | 'BottomRight' | 'MiddleMiddle'

const mapping: { [key: number]: Line[] } = {
  0: ['BottomLeft', 'BottomMiddle', 'BottomRight', 'TopLeft', 'TopMiddle', 'TopRight'],
  1: ['TopRight', 'BottomRight'],
  2: ['TopMiddle', 'TopRight', 'MiddleMiddle', 'BottomLeft', 'BottomMiddle'],
  3: ['TopMiddle', 'TopRight', 'MiddleMiddle', 'BottomRight', 'BottomMiddle'],
  4: ['TopLeft', 'TopRight', 'MiddleMiddle', 'BottomRight'],
  5: ['TopMiddle', 'TopLeft', 'MiddleMiddle', 'BottomRight', 'BottomMiddle'],
  6: ['TopMiddle', 'TopLeft', 'MiddleMiddle', 'BottomLeft', 'BottomMiddle', 'BottomRight'],
  7: ['TopMiddle', 'TopRight', 'BottomRight'],
  8: ['TopLeft', 'TopMiddle', 'TopRight', 'MiddleMiddle', 'BottomLeft', 'BottomMiddle', 'BottomRight'],
  9: ['TopLeft', 'TopMiddle', 'TopRight', 'MiddleMiddle', 'BottomMiddle', 'BottomRight'],
}

function areArraysEqual(first: unknown[], second: unknown[]): boolean {
  const isInfirst = first.every((item) => second.find((item2) => item === item2))
  const isInSecond = second.every((item) => first.find((item2) => item === item2))
  return first.length === second.length && isInfirst && isInSecond
}

export function linesToNumber(inputLines: Line[]): number {
  for (const [number, mappingLines] of Object.entries(mapping)) {
    if (areArraysEqual(inputLines, mappingLines)) {
      return Number(number)
    }
  }
  throw new Error('no number from possible lines')
}

export function numberToLines(input: number): Line[] {
  for (const [number, mappingLines] of Object.entries(mapping)) {
    if (Number(number) === input) {
      return [...mappingLines]
    }
  }
  throw new Error('no possible lines from number')
}
