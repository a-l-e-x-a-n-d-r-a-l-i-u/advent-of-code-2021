import { test, expect } from '@jest/globals'
import { Seq } from 'immutable'
import { SnailfishNumber, sumAll } from './snailfish-math.js'

test('simple sum all', () => {
  const all: SnailfishNumber[] = [
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
  ]
  const result = sumAll(Seq(all))
  expect(result).toEqual([
    [
      [
        [1, 1],
        [2, 2],
      ],
      [3, 3],
    ],
    [4, 4],
  ])
})
test('simple sum all with explosion', () => {
  const all: SnailfishNumber[] = [
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
  ]
  const result = sumAll(Seq(all))
  expect(result).toEqual([
    [
      [
        [3, 0],
        [5, 3],
      ],
      [4, 4],
    ],
    [5, 5],
  ])
})
test('simple sum all with more explosion', () => {
  const all: SnailfishNumber[] = [
    [1, 1],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 5],
    [6, 6],
  ]
  const result = sumAll(Seq(all))
  expect(result).toEqual([
    [
      [
        [5, 0],
        [7, 4],
      ],
      [5, 5],
    ],
    [6, 6],
  ])
})

test('complex sum all', () => {
  const all: SnailfishNumber[] = [
    [
      [
        [0, [4, 5]],
        [0, 0],
      ],
      [
        [
          [4, 5],
          [2, 6],
        ],
        [9, 5],
      ],
    ],
    [
      7,
      [
        [
          [3, 7],
          [4, 3],
        ],
        [
          [6, 3],
          [8, 8],
        ],
      ],
    ],
    [
      [
        2,
        [
          [0, 8],
          [3, 4],
        ],
      ],
      [
        [[6, 7], 1],
        [7, [1, 6]],
      ],
    ],
    [
      [
        [[2, 4], 7],
        [6, [0, 5]],
      ],
      [
        [
          [6, 8],
          [2, 8],
        ],
        [
          [2, 1],
          [4, 5],
        ],
      ],
    ],
    [
      7,
      [
        5,
        [
          [3, 8],
          [1, 4],
        ],
      ],
    ],
    [
      [2, [2, 2]],
      [8, [8, 1]],
    ],
    [2, 9],
    [
      1,
      [
        [[9, 3], 9],
        [
          [9, 0],
          [0, 7],
        ],
      ],
    ],
    [[[5, [7, 4]], 7], 1],
    [
      [[[4, 2], 2], 6],
      [8, 7],
    ],
  ]
  const result = sumAll(Seq(all))
  expect(result).toEqual([
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
  ])
})
