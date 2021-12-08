import { readFileSync } from 'fs'
import { Signal } from './SevenSegmentDisplay.js'

export interface DigitEntry {
  allUniqueSignals: [Signal, Signal, Signal, Signal, Signal, Signal, Signal, Signal, Signal, Signal]
  numericOutput: [Signal, Signal, Signal, Signal]
}
export function loadInput(): DigitEntry[] {
  return readFileSync('input', { encoding: 'utf-8' })
    .split('\n')
    .filter((line) => line.length > 0)
    .map(parseLine)
}

function parseLine(line: string): DigitEntry {
  const parts = line.split('|')
  if (parts.length !== 2) {
    throw new Error(`unable to parse line because no pipe: "${line}"`)
  }
  const allUniqueSignals = parseSignalList(parts[0]) as DigitEntry['allUniqueSignals']
  const numericOutput = parseSignalList(parts[1]) as DigitEntry['numericOutput']
  if (allUniqueSignals.length !== 10) {
    throw new Error('could not find 10 unique signals in entry')
  }
  if (numericOutput.length !== 4) {
    throw new Error('could not find 10 unique signals in entry')
  }
  return {
    allUniqueSignals,
    numericOutput,
  }
}
function parseSignalList(signalList: string): Signal[] {
  return signalList
    .split(' ')
    .map((signal) => signal.trim())
    .filter((signal) => signal.length > 0)
    .map((listAsString) => {
      const segmentList = [...listAsString]
      if (
        segmentList.some(
          (segment) =>
            segment !== 'a' &&
            segment !== 'b' &&
            segment !== 'c' &&
            segment !== 'd' &&
            segment !== 'e' &&
            segment !== 'f' &&
            segment !== 'g',
        )
      ) {
        throw new Error('invalid id found in segment list input')
      }
      return segmentList as Signal
    })
}
