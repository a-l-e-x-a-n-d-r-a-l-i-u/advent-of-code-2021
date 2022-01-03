import { test, expect } from '@jest/globals'
import { List } from 'immutable'
import { Alu } from './Alu'
import { RawInstruction } from './load'

test('test most basic ALU', () => {
  const instructions: List<RawInstruction> = List([
    {
      instruction: 'inp',
      first: 'x',
      second: -1,
    },
    {
      instruction: 'mul',
      first: 'x',
      second: -1,
    },
  ])
  const alu = new Alu(instructions)
  alu.run([5])
  expect(alu.x).toBe(-5)
})

test('test second basic ALU', () => {
  const instructions: List<RawInstruction> = List([
    {
      instruction: 'inp',
      first: 'z',
      second: -1,
    },
    {
      instruction: 'inp',
      first: 'x',
      second: -1,
    },
    {
      instruction: 'mul',
      first: 'z',
      second: 3,
    },
    {
      instruction: 'eql',
      first: 'z',
      second: 'x',
    },
  ])
  const alu = new Alu(instructions)
  alu.run([1, 2])
  expect(alu.z).toBe(0)
  alu.run([1, 3])
  expect(alu.z).toBe(1)
  alu.run([1, 4])
  expect(alu.z).toBe(0)
  alu.run([2, 6])
  expect(alu.z).toBe(1)
})

test('test third basic ALU', () => {
  const instructions: List<RawInstruction> = List([
    {
      instruction: 'inp',
      first: 'w',
      second: -1,
    },
    {
      instruction: 'add',
      first: 'z',
      second: 'w',
    },
    {
      instruction: 'mod',
      first: 'z',
      second: 2,
    },
    {
      instruction: 'div',
      first: 'w',
      second: 2,
    },
    {
      instruction: 'add',
      first: 'y',
      second: 'w',
    },
    {
      instruction: 'mod',
      first: 'y',
      second: 2,
    },
    {
      instruction: 'div',
      first: 'w',
      second: 2,
    },
    {
      instruction: 'add',
      first: 'x',
      second: 'w',
    },
    {
      instruction: 'mod',
      first: 'x',
      second: 2,
    },
    {
      instruction: 'div',
      first: 'w',
      second: 2,
    },
    {
      instruction: 'mod',
      first: 'w',
      second: 2,
    },
  ])
  const alu = new Alu(instructions)
  alu.run([7])
  expect(alu.z).toBe(1)
  expect(alu.y).toBe(1)
  expect(alu.x).toBe(1)
  expect(alu.w).toBe(0)
  alu.run([10])
  expect(alu.z).toBe(0)
  expect(alu.y).toBe(1)
  expect(alu.x).toBe(0)
  expect(alu.w).toBe(1)
})
