import { test, expect } from '@jest/globals'
import { evaluate } from './bits-evaluator.js'
import { parsePacketFromBuffer } from './bits-parser.js'

test('example sum evaluates', () => {
  const packet = parsePacketFromBuffer(Buffer.from('C200B40A82', 'hex'))
  const result = evaluate(packet)
  expect(result).toEqual(3)
})

test('example product evaluates', () => {
  const packet = parsePacketFromBuffer(Buffer.from('04005AC33890', 'hex'))
  const result = evaluate(packet)
  expect(result).toEqual(54)
})
test('example minimum evaluates', () => {
  const packet = parsePacketFromBuffer(Buffer.from('880086C3E88112', 'hex'))
  const result = evaluate(packet)
  expect(result).toEqual(7)
})
test('example maximum evaluates', () => {
  const packet = parsePacketFromBuffer(Buffer.from('CE00C43D881120', 'hex'))
  const result = evaluate(packet)
  expect(result).toEqual(9)
})
test('example less than evaluates', () => {
  const packet = parsePacketFromBuffer(Buffer.from('D8005AC2A8F0', 'hex'))
  const result = evaluate(packet)
  expect(result).toEqual(1)
})
test('example greater than evaluates', () => {
  const packet = parsePacketFromBuffer(Buffer.from('F600BC2D8F', 'hex'))
  const result = evaluate(packet)
  expect(result).toEqual(0)
})
test('example equal to evaluates', () => {
  const packet = parsePacketFromBuffer(Buffer.from('9C005AC2F8F0', 'hex'))
  const result = evaluate(packet)
  expect(result).toEqual(0)
})
test('example complex evaluates', () => {
  const packet = parsePacketFromBuffer(Buffer.from('9C0141080250320F1802104A08', 'hex'))
  const result = evaluate(packet)
  expect(result).toEqual(1)
})
