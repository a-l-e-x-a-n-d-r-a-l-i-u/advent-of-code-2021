import { test, expect } from '@jest/globals'
import { List, Seq } from 'immutable'
import outdent from 'outdent'
import { Grid } from './Grid.js'
import { RawCell } from './load.js'

function buildRawGrid(rawGridAsString: string): List<List<RawCell>> {
  return Seq(rawGridAsString.split('\n'))
    .map((line) => line.trim())
    .map((line) => List(line.split('') as RawCell[]))
    .toList()
}

test('move only once in a traffic jam', () => {
  const rawGrid = buildRawGrid('...>>>>>...')
  const grid = new Grid(rawGrid)
  const changes = grid.calculateStep()
  expect(changes).toBe(1)
  expect(grid.asString).toBe('...>>>>.>..')
  grid.calculateStep()
  expect(grid.asString).toBe('...>>>.>.>.')
})

test('east then south', () => {
  const rawGrid = buildRawGrid(outdent`
    ..........
    .>v....v..
    .......>..
    ..........`)
  const grid = new Grid(rawGrid)
  grid.calculateStep()
  expect(grid.asString).toBe(outdent`
    ..........
    .>........
    ..v....v>.
    ..........`)
})

test('pacman rules', () => {
  const rawGrid = buildRawGrid(outdent`
    ...>...
    .......
    ......>
    v.....>
    ......>
    .......
    ..vvv..`)
  const grid = new Grid(rawGrid)
  grid.calculateStep()
  expect(grid.asString).toBe(outdent`
    ..vv>..
    .......
    >......
    v.....>
    >......
    .......
    ....v..`)
  while (grid.stepsMoved !== 4) {
    grid.calculateStep()
  }
  expect(grid.asString).toBe(outdent`
    >......
    ..v....
    ..>.v..
    .>.v...
    ...>...
    .......
    v......`)
})

test('can stabilise', () => {
  const rawGrid = buildRawGrid(outdent`
    v...>>.vv>
    .vv>>.vv..
    >>.>v>...v
    >>v>>.>.v.
    v>v.vv.v..
    >.>>..v...
    .vv..>.>v.
    v.v..>>v.v
    ....v..v.>`)
  const grid = new Grid(rawGrid)
  grid.calculateStepsUntilStable()
  expect(grid.stepsMoved).toBe(58)

  expect(grid.asString).toBe(outdent`
    ..>>v>vv..
    ..v.>>vv..
    ..>>v>>vv.
    ..>>>>>vv.
    v......>vv
    v>v....>>v
    vvv.....>>
    >vv......>
    .>v.vv.v..`)
})
