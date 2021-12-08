import { Line, linesToNumber } from './lines.js'

export type Segment = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g'
export type Signal = Segment[]

type PossibleLines = {
  [key in Line]: Segment[]
}
function allPossibleSegments(): Segment[] {
  return ['a', 'b', 'c', 'd', 'e', 'f', 'g']
}
export class SevenSegmentDisplay {
  private possibleLines: PossibleLines = {
    TopMiddle: allPossibleSegments(),
    TopLeft: allPossibleSegments(),
    TopRight: allPossibleSegments(),
    BottomMiddle: allPossibleSegments(),
    BottomLeft: allPossibleSegments(),
    BottomRight: allPossibleSegments(),
    MiddleMiddle: allPossibleSegments(),
  }

  public narrowPossibleSegments(lines: Line[], segments: Segment[]): void {
    for (const line of lines) {
      if (this.possibleLines[line].length !== 1) {
        this.possibleLines[line] = this.possibleLines[line].filter((possibleSegment) =>
          segments.includes(possibleSegment),
        )
        if (this.possibleLines[line].length === 1) {
          this.lockInSegment(line, this.possibleLines[line][0])
        }
      }
    }
  }

  public lockInSegment(line: Line, segment: Segment): void {
    for (const possibleLine of Object.keys(this.possibleLines) as Line[]) {
      if (possibleLine === line) {
        this.possibleLines[possibleLine] = [segment]
      } else {
        this.possibleLines[possibleLine] = this.possibleLines[possibleLine].filter(
          (possibleSegment) => possibleSegment !== segment,
        )
      }
    }
  }

  public parseSignal(signal: Signal): number {
    const usedLines: Line[] = []
    for (const [line, segment] of Object.entries(this.possibleLines)) {
      if (segment.length !== 1) {
        throw new Error('cannot parse signal to number as search space is not 1')
      }
      if (signal.includes(segment[0])) {
        usedLines.push(line as Line)
      }
    }
    return linesToNumber(usedLines)
  }

  public get allLockedIn(): boolean {
    return Object.values(this.possibleLines).every((lines) => lines.length === 1)
  }
}
