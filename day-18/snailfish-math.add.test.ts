import { test, expect } from '@jest/globals'
import { add, SnailfishNumber } from './snailfish-math.js'

test('add simple', () => {
  const left: SnailfishNumber = [1, 2]
  const right: SnailfishNumber = [[3, 4], 5]

  const result = add(left, right)
  expect(result).toEqual([
    [1, 2],
    [[3, 4], 5],
  ])
})

test('add with some reduction', () => {
  const left: SnailfishNumber = [
    [[[4, 3], 4], 4],
    [7, [[8, 4], 9]],
  ]
  const right: SnailfishNumber = [1, 1]

  const result = add(left, right)
  expect(result).toEqual([
    [
      [[0, 7], 4],
      [
        [7, 8],
        [6, 0],
      ],
    ],
    [8, 1],
  ])
})
