import { Map, Set } from 'immutable'
import { FoldInstruction, Point } from './load.js'

export type Dot = Map<'x' | 'y', number>
export type DotSet = Set<Dot>

export function buildDotSet(points: Point[]): DotSet {
  return Set(points.map((point) => Map(point)))
}

export function fold(dots: DotSet, foldInstruction: FoldInstruction): DotSet {
  return dots.withMutations((mutableDots) => {
    for (const dot of dots) {
      const dotPivot = dot.get(foldInstruction.axis)
      if (dotPivot == null) {
        throw new Error('invalid dot')
      }
      if (dotPivot > foldInstruction.line) {
        mutableDots.remove(dot)
        mutableDots.add(dot.set(foldInstruction.axis, foldInstruction.line - (dotPivot - foldInstruction.line)))
      }
    }
  })
}

export function printDotSet(dotSet: DotSet): void {
  const maxX = dotSet.map((dot) => dot.get('x')).max() || 0
  const maxY = dotSet.map((dot) => dot.get('y')).max() || 0
  for (let y = 0; y <= maxY; y += 1) {
    let line = ''
    for (let x = 0; x <= maxX; x += 1) {
      line += dotSet.contains(Map({ x, y }) as Dot) ? '■' : ' '
    }
    console.log(line)
  }
}
