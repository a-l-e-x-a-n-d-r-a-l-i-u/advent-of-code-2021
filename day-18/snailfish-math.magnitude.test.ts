import { test, expect } from '@jest/globals'
import { magnitude, SnailfishNumber } from './snailfish-math.js'

test('magnitude example 1', () => {
  const number: SnailfishNumber = [
    [1, 2],
    [[3, 4], 5],
  ]

  const result = magnitude(number)
  expect(result).toEqual(143)
})
test('magnitude example 1', () => {
  const number: SnailfishNumber = [
    [
      [[0, 7], 4],
      [
        [7, 8],
        [6, 0],
      ],
    ],
    [8, 1],
  ]

  const result = magnitude(number)
  expect(result).toEqual(1384)
})
test('magnitude example 1', () => {
  const number: SnailfishNumber = [
    [
      [
        [1, 1],
        [2, 2],
      ],
      [3, 3],
    ],
    [4, 4],
  ]

  const result = magnitude(number)
  expect(result).toEqual(445)
})
test('magnitude example 1', () => {
  const number: SnailfishNumber = [
    [
      [
        [3, 0],
        [5, 3],
      ],
      [4, 4],
    ],
    [5, 5],
  ]

  const result = magnitude(number)
  expect(result).toEqual(791)
})
test('magnitude example 1', () => {
  const number: SnailfishNumber = [
    [
      [
        [5, 0],
        [7, 4],
      ],
      [5, 5],
    ],
    [6, 6],
  ]

  const result = magnitude(number)
  expect(result).toEqual(1137)
})
test('magnitude example 1', () => {
  const number: SnailfishNumber = [
    [
      [
        [8, 7],
        [7, 7],
      ],
      [
        [8, 6],
        [7, 7],
      ],
    ],
    [
      [
        [0, 7],
        [6, 6],
      ],
      [8, 7],
    ],
  ]

  const result = magnitude(number)
  expect(result).toEqual(3488)
})
