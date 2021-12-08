import type { Dictionary } from 'lodash'
import { flow, flatten, countBy, invertBy } from 'lodash-es'
import { numberToLines } from './lines.js'
import { DigitEntry, loadInput } from './load.js'
import { Segment, SevenSegmentDisplay } from './SevenSegmentDisplay.js'

function calculateOutputNumber(entry: DigitEntry): number {
  const oneSignal = entry.allUniqueSignals.find((signal) => signal.length === 2)
  const fourSignal = entry.allUniqueSignals.find((signal) => signal.length === 4)
  const sevenSignal = entry.allUniqueSignals.find((signal) => signal.length === 3)
  const eightSignal = entry.allUniqueSignals.find((signal) => signal.length === 7)
  if (!oneSignal || !fourSignal || !sevenSignal || !eightSignal) {
    throw new Error('cannot find the simple signals')
  }
  const display = new SevenSegmentDisplay()

  const countOfEachSignal = flow(flatten, countBy, invertBy)(entry.allUniqueSignals) as Dictionary<Segment[]>
  const bottomLeftSegment = countOfEachSignal['4'][0]
  display.lockInSegment('BottomLeft', bottomLeftSegment)
  const topLeftSegment = countOfEachSignal['6'][0]
  display.lockInSegment('TopLeft', topLeftSegment)
  const bottomRightSegment = countOfEachSignal['9'][0]
  display.lockInSegment('BottomRight', bottomRightSegment)

  display.narrowPossibleSegments(numberToLines(1), oneSignal)
  display.narrowPossibleSegments(numberToLines(4), fourSignal)
  display.narrowPossibleSegments(numberToLines(7), sevenSignal)
  display.narrowPossibleSegments(numberToLines(8), eightSignal) // this does nothing!

  if (!display.allLockedIn) {
    throw new Error('could not narrow down every display segment')
  }
  const displayOut = entry.numericOutput.map((signal) => display.parseSignal(signal)).join('')
  return Number(displayOut)
}
const input = loadInput()

const allOutputs = input.map(calculateOutputNumber)
const totalOfAllOutputs = allOutputs.reduce((prev, curr) => prev + curr, 0)

console.log('total of all outputs', totalOfAllOutputs)
