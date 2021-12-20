import { test, expect } from '@jest/globals'
import { explodeIfNeeded, SnailfishNumber, splitIfNeeded } from './snailfish-math.js'

test('simple explode far left', () => {
  const value: SnailfishNumber = [[[[[9, 8], 1], 2], 3], 4]

  const result = explodeIfNeeded(value)
  expect(result).toEqual([[[[0, 9], 2], 3], 4])
})
test('simple explode far right', () => {
  const value: SnailfishNumber = [7, [6, [5, [4, [3, 2]]]]]

  const result = explodeIfNeeded(value)
  expect(result).toEqual([7, [6, [5, [7, 0]]]])
})
test('simple explode middleish', () => {
  const value: SnailfishNumber = [[6, [5, [4, [3, 2]]]], 1]

  const result = explodeIfNeeded(value)
  expect(result).toEqual([[6, [5, [7, 0]]], 3])
})
test('complex explode middle', () => {
  const value: SnailfishNumber = [
    [3, [2, [1, [7, 3]]]],
    [6, [5, [4, [3, 2]]]],
  ]

  const result = explodeIfNeeded(value)
  expect(result).toEqual([
    [3, [2, [8, 0]]],
    [9, [5, [4, [3, 2]]]],
  ])
})
test('complex explode middle 2', () => {
  const value: SnailfishNumber = [
    [3, [2, [8, 0]]],
    [9, [5, [4, [3, 2]]]],
  ]

  const result = explodeIfNeeded(value)
  expect(result).toEqual([
    [3, [2, [8, 0]]],
    [9, [5, [7, 0]]],
  ])
})

test('split 1', () => {
  const value: SnailfishNumber = [
    [
      [[0, 7], 4],
      [15, [0, 13]],
    ],
    [1, 1],
  ]

  const result = splitIfNeeded(value)
  expect(result).toEqual([
    [
      [[0, 7], 4],
      [
        [7, 8],
        [0, 13],
      ],
    ],
    [1, 1],
  ])
})
test('split 2', () => {
  const value: SnailfishNumber = [
    [
      [[0, 7], 4],
      [
        [7, 8],
        [0, 13],
      ],
    ],
    [1, 1],
  ]

  const result = splitIfNeeded(value)
  expect(result).toEqual([
    [
      [[0, 7], 4],
      [
        [7, 8],
        [0, [6, 7]],
      ],
    ],
    [1, 1],
  ])
})
