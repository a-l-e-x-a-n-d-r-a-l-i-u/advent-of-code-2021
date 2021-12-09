import { readFileSync } from 'fs'
import { flow, countBy, invertBy } from 'lodash-es'

export interface DigitEntry {
  allUniqueSignals: [string, string, string, string, string, string, string, string, string, string]
  numericOutput: [string, string, string, string]
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
  const allUniqueSignals = parts[0].split(' ') as DigitEntry['allUniqueSignals']
  const numericOutput = parts[1].split(' ') as DigitEntry['numericOutput']
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

function calculateOutputNumber(entry: DigitEntry): number {
  const mapping = new Map<string, number>()
  const oneSignal = entry.allUniqueSignals.find((signal) => signal.length === 2)
  if (!oneSignal) {
    throw new Error('could not find one signal')
  }

  const fourSignal = entry.allUniqueSignals.find((signal) => signal.length === 4)
  const sevenSignal = entry.allUniqueSignals.find((signal) => signal.length === 3)
  const eightSignal = entry.allUniqueSignals.find((signal) => signal.length === 7)

  const countOfEachSignal = flow(countBy, invertBy)(entry.allUniqueSignals)
  const bottomLeftSegment = countOfEachSignal['4'][0]
  const topLeftSegment = countOfEachSignal['6'][0]
  const bottomRightSegment = countOfEachSignal['9'][0]

  const nineSignal = entry.allUniqueSignals.find((signal) => signal.length === 6 && !signal.includes(bottomLeftSegment))
  const twoSignal = entry.allUniqueSignals.find((signal) => signal.length === 5 && !signal.includes(bottomRightSegment))
  const threeSignal = entry.allUniqueSignals.find(
    (signal) => signal.length === 5 && signal.includes(bottomRightSegment) && !signal.includes(topLeftSegment),
  )
  const fiveSignal = entry.allUniqueSignals.find(
    (signal) => signal.length === 5 && signal !== twoSignal && signal !== threeSignal,
  )
  const zeroSignal = entry.allUniqueSignals.find(
    (signal) =>
      signal.length === 6 && signal !== nineSignal && signal.includes(oneSignal[0]) && signal.includes(oneSignal[1]),
  )
  const sixSignal = entry.allUniqueSignals.find(
    (signal) => signal.length === 6 && signal !== nineSignal && signal !== zeroSignal,
  )

  if (
    !zeroSignal ||
    !oneSignal ||
    !twoSignal ||
    !threeSignal ||
    !fourSignal ||
    !fiveSignal ||
    !sixSignal ||
    !sevenSignal ||
    !eightSignal ||
    !nineSignal
  ) {
    throw new Error('cannot find the signals')
  }

  mapping.set(zeroSignal, 0)
  mapping.set(oneSignal, 1)
  mapping.set(twoSignal, 2)
  mapping.set(threeSignal, 3)
  mapping.set(fourSignal, 4)
  mapping.set(fiveSignal, 5)
  mapping.set(sixSignal, 6)
  mapping.set(sevenSignal, 7)
  mapping.set(eightSignal, 8)
  mapping.set(nineSignal, 9)

  const displayOut = entry.numericOutput.map((signal) => mapping.get(signal)).join('')
  return Number(displayOut)
}

const input = loadInput()

const allOutputs = input.map(calculateOutputNumber)
const totalOfAllOutputs = allOutputs.reduce((prev, curr) => prev + curr, 0)

console.log('total of all outputs', totalOfAllOutputs)
