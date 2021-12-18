import { test, expect } from '@jest/globals'
import { PacketNumberLiteral, PacketOperator, parsePacketFromBuffer } from './bits-parser.js'
import { sumAllVersions } from './part1.js'

test('example literal parses', () => {
  const packet = parsePacketFromBuffer(Buffer.from('D2FE28', 'hex'))
  expect(packet.typeId).toEqual(4)
  expect(packet.version).toEqual(6)
  if (!('literal' in packet)) {
    throw new Error('literal not found')
  }
  expect(packet.literal).toEqual(2021)
})

test('example operator 1 parses', () => {
  const packet = parsePacketFromBuffer(Buffer.from('38006F45291200', 'hex'))
  expect(packet.typeId).toEqual(6)
  expect(packet.version).toEqual(1)
  if (!('subPackets' in packet)) {
    throw new Error('literal not found')
  }
  expect(packet.subPackets.size).toEqual(2)
  expect((packet.subPackets.first() as PacketNumberLiteral).literal).toEqual(10)
  expect((packet.subPackets.last() as PacketNumberLiteral).literal).toEqual(20)
})

test('example operator 2 parses', () => {
  const packet = parsePacketFromBuffer(Buffer.from('EE00D40C823060', 'hex'))
  expect(packet.typeId).toEqual(3)
  expect(packet.version).toEqual(7)
  if (!('subPackets' in packet)) {
    throw new Error('literal not found')
  }
  expect(packet.subPackets.size).toEqual(3)
  expect((packet.subPackets.first() as PacketNumberLiteral).literal).toEqual(1)
  expect((packet.subPackets.get(1) as PacketNumberLiteral).literal).toEqual(2)
  expect((packet.subPackets.last() as PacketNumberLiteral).literal).toEqual(3)
})

test('example extra 1 parses', () => {
  const packet = parsePacketFromBuffer(Buffer.from('8A004A801A8002F478', 'hex'))
  expect(packet.typeId).not.toEqual(4)
  expect(packet.version).toEqual(4)
  if (!('subPackets' in packet)) {
    throw new Error('literal not found')
  }
  const firstSubPacket = packet.subPackets.first() as PacketOperator
  expect(firstSubPacket.version).toEqual(1)
  const secondSubPacket = firstSubPacket.subPackets.first() as PacketOperator
  expect(secondSubPacket.version).toEqual(5)
  const thirdSubPacket = secondSubPacket.subPackets.first() as PacketNumberLiteral
  expect(thirdSubPacket.version).toEqual(6)
  expect(sumAllVersions(packet)).toEqual(16)
})

test('example extra 2 parses', () => {
  const packet = parsePacketFromBuffer(Buffer.from('620080001611562C8802118E34', 'hex'))
  expect(sumAllVersions(packet)).toEqual(12)
})

test('example extra 3 parses', () => {
  const packet = parsePacketFromBuffer(Buffer.from('C0015000016115A2E0802F182340', 'hex'))
  expect(sumAllVersions(packet)).toEqual(23)
})

test('example extra 4 parses', () => {
  const packet = parsePacketFromBuffer(Buffer.from('A0016C880162017C3686B18A3D4780', 'hex'))
  expect(sumAllVersions(packet)).toEqual(31)
})
