import { evaluate } from './bits-evaluator.js'
import { parsePacketFromBuffer } from './bits-parser.js'
import { loadInput } from './load.js'

const input = loadInput()

const packet = parsePacketFromBuffer(input)
console.log('evaluate result', evaluate(packet))
