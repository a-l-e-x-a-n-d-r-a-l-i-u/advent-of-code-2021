import { BitStream } from 'bit-buffer'
import { List, Repeat } from 'immutable'

interface BasePacket {
  version: number
}
export interface PacketNumberLiteral extends BasePacket {
  typeId: 4
  literal: number
}
export interface PacketOperator extends BasePacket {
  subPackets: List<Packet>
}
export interface PacketOperatorSum extends PacketOperator {
  typeId: 0
}
export interface PacketOperatorProduct extends PacketOperator {
  typeId: 1
}
export interface PacketOperatorMinimum extends PacketOperator {
  typeId: 2
}
export interface PacketOperatorMaximum extends PacketOperator {
  typeId: 3
}
export interface PacketOperatorGreaterThan extends PacketOperator {
  typeId: 5
}
export interface PacketOperatorLessThan extends PacketOperator {
  typeId: 6
}
export interface PacketOperatorEqualTo extends PacketOperator {
  typeId: 7
}
export type Packet =
  | PacketNumberLiteral
  | PacketOperatorSum
  | PacketOperatorProduct
  | PacketOperatorMinimum
  | PacketOperatorMaximum
  | PacketOperatorGreaterThan
  | PacketOperatorLessThan
  | PacketOperatorEqualTo

function parseLiteralNumber(stream: BitStream): number {
  let finalNumber = 0
  let keepReading = true
  while (keepReading) {
    keepReading = stream.readBoolean()
    const partOfNumber = stream.readBits(4)
    finalNumber *= 2 ** 4 // this is kinda like a bitshift 4, but doesn't break javascript's 32 bit limit for ints in bitwise????
    finalNumber += partOfNumber // close enough to logical or
  }
  return finalNumber
}
function parseOperator(stream: BitStream): List<Packet> {
  const isPacketCount = stream.readBoolean()
  if (isPacketCount) {
    const count = stream.readBits(11)
    return parseFixPacketCount(stream, count)
  }
  const parseUntil = stream.readBits(15)
  const subPacketStream = stream.readBitStream(parseUntil)
  return List<Packet>().withMutations((mutablePacketList) => {
    while (subPacketStream.bitsLeft > 10) {
      // 11 bits is the minimum packet length
      mutablePacketList.push(parsePacket(subPacketStream))
    }
  })
}

function parseFixPacketCount(stream: BitStream, count: number): List<Packet> {
  return Repeat(null, count)
    .map(() => parsePacket(stream))
    .toList()
}
export function parsePacket(stream: BitStream): Packet {
  const version = stream.readBits(3)
  const typeId = stream.readBits(3) as Packet['typeId']
  if (typeId < 0 || typeId > 7) {
    throw new Error('invalid type id found')
  }
  if (typeId === 4) {
    const literal = parseLiteralNumber(stream)
    return {
      version,
      typeId,
      literal,
    }
  }
  const subPackets = parseOperator(stream)
  return {
    version,
    typeId,
    subPackets,
  }
}

export function parsePacketFromBuffer(buffer: Buffer): Packet {
  const stream = new BitStream(new Uint8Array(buffer).buffer) // buffer buffer buffer is a workaround for a bug in the bitstream library
  stream.bigEndian = true
  return parsePacket(stream)
}
