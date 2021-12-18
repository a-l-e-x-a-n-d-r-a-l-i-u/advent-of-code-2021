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
  typeId: number
  subPackets: List<Packet>
}
export type Packet = PacketNumberLiteral | PacketOperator

function parseLiteralNumber(stream: BitStream): number {
  let finalNumber = 0
  let keepReading = true
  while (keepReading) {
    keepReading = stream.readBoolean()
    const partOfNumber = stream.readBits(4)
    /* eslint-disable no-bitwise -- it is bit ops, we need to*/
    finalNumber <<= 4
    finalNumber |= partOfNumber
    /* eslint-enable no-bitwise */
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
  const typeId = stream.readBits(3)
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
