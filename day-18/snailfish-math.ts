import { cloneDeep, set as setIn } from 'lodash-es'
import { Seq } from 'immutable'

export type SnailfishNumber = readonly [SnailfishNumber, SnailfishNumber] | number

export function add(left: SnailfishNumber, right: SnailfishNumber): SnailfishNumber {
  return reduce([left, right] as const)
}

function* iterateNaturalNumbersLeftToRight(
  value: SnailfishNumber,
  currentPath: number[] = [],
): Generator<{ path: number[]; value: number }, void> {
  if (typeof value === 'number') {
    throw new Error('cannot traverse natural numbers')
  }
  if (typeof value[0] !== 'number') {
    yield* iterateNaturalNumbersLeftToRight(value[0], [...currentPath, 0])
  } else {
    yield { value: value[0], path: [...currentPath, 0] }
  }
  if (typeof value[1] !== 'number') {
    yield* iterateNaturalNumbersLeftToRight(value[1], [...currentPath, 1])
  } else {
    yield { value: value[1], path: [...currentPath, 1] }
  }
}

export function explodeIfNeeded(value: SnailfishNumber): SnailfishNumber | null {
  const iterator = iterateNaturalNumbersLeftToRight(value)
  let previous: {
    path: number[]
    value: number
  } | null = null
  for (const naturalNumber of iterator) {
    if (naturalNumber.path.length > 4) {
      const left = naturalNumber
      const right = iterator.next()
      const next = iterator.next()
      const newTree = cloneDeep(value) as readonly [SnailfishNumber, SnailfishNumber]
      setIn(newTree, left.path.slice(0, -1), 0)
      if (previous) {
        setIn(newTree, previous.path, previous.value + left.value)
      }
      if (!next.done && !right.done) {
        setIn(newTree, next.value.path, next.value.value + right.value.value)
      }
      return newTree
    }
    previous = naturalNumber
  }
  return null
}
export function splitIfNeeded(value: SnailfishNumber): SnailfishNumber | null {
  for (const naturalNumber of iterateNaturalNumbersLeftToRight(value)) {
    if (naturalNumber.value > 9) {
      const newTree = cloneDeep(value) as readonly [SnailfishNumber, SnailfishNumber]
      setIn(newTree, naturalNumber.path, [Math.floor(naturalNumber.value / 2), Math.ceil(naturalNumber.value / 2)])
      return newTree
    }
  }
  return null
}

export function reduceIfNeeded(value: SnailfishNumber): SnailfishNumber | null {
  const exploded = explodeIfNeeded(value)
  if (exploded) {
    return exploded
  }
  const split = splitIfNeeded(value)
  if (split) {
    return split
  }
  return null
}

export function reduce(value: SnailfishNumber): SnailfishNumber {
  let stillReducing = true
  let currentValue = value
  while (stillReducing) {
    const reducedNumber = reduceIfNeeded(currentValue)
    if (reducedNumber != null) {
      currentValue = reducedNumber
    } else {
      stillReducing = false
    }
  }
  return currentValue
}

export function sumAll(values: Seq.Indexed<SnailfishNumber>): SnailfishNumber {
  return values.reduce((prev, curr) => add(prev, curr))
}

export function magnitude(value: SnailfishNumber): number {
  if (typeof value === 'number') {
    return value
  }
  return 3 * magnitude(value[0]) + 2 * magnitude(value[1])
}
