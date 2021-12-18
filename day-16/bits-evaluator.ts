import { Packet, PacketOperatorEqualTo, PacketOperatorGreaterThan, PacketOperatorLessThan } from './bits-parser.js'

export function evaluate(packet: Packet): number {
  if (packet.typeId === 4) {
    return packet.literal
  }
  if (packet.typeId === 0) {
    return packet.subPackets.reduce((prev, subPacket) => prev + evaluate(subPacket), 0)
  }
  if (packet.typeId === 1) {
    return packet.subPackets.reduce((prev, subPacket) => prev * evaluate(subPacket), 1)
  }
  if (packet.typeId === 2) {
    return packet.subPackets.reduce((prev, subPacket) => Math.min(prev, evaluate(subPacket)), Number.POSITIVE_INFINITY)
  }
  if (packet.typeId === 3) {
    return packet.subPackets.reduce((prev, subPacket) => Math.max(prev, evaluate(subPacket)), Number.NEGATIVE_INFINITY)
  }
  if (packet.typeId === 5) {
    return evaluateTruthyOperator(packet, (first, second) => first > second)
  }
  if (packet.typeId === 6) {
    return evaluateTruthyOperator(packet, (first, second) => first < second)
  }
  if (packet.typeId === 7) {
    return evaluateTruthyOperator(packet, (first, second) => first === second)
  }
  throw new Error('invalid packet')
}

function evaluateTruthyOperator(
  packet: PacketOperatorEqualTo | PacketOperatorGreaterThan | PacketOperatorLessThan,
  test: (first: number, second: number) => boolean,
): number {
  const first = packet.subPackets.first()
  const second = packet.subPackets.last()
  if (!first || !second || packet.subPackets.size !== 2) {
    throw new Error('could not find 2 sub packets in a thruthy operator')
  }
  return test(evaluate(first), evaluate(second)) ? 1 : 0
}
