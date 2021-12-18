import { Packet, parsePacketFromBuffer } from './bits-parser.js'
import { loadInput } from './load.js'

export function sumAllVersions(packet: Packet): number {
  let versionTotal = packet.version
  if ('subPackets' in packet) {
    for (const subPacket of packet.subPackets) {
      versionTotal += sumAllVersions(subPacket)
    }
  }
  return versionTotal
}

const input = loadInput()

const packet = parsePacketFromBuffer(input)
console.log('sum of all version', sumAllVersions(packet))
