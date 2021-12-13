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
