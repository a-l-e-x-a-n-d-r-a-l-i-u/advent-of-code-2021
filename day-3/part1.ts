import { createReadStream } from 'fs'
import { createInterface } from 'readline'
import { LineProcessor } from './LineProcessor.js'

const fileStream = createReadStream('input')

const readLine = createInterface({
  input: fileStream,
  crlfDelay: Infinity,
})
let lineProcessor: LineProcessor | null = null
for await (const line of readLine) {
  if (lineProcessor == null) {
    lineProcessor = new LineProcessor(line.length)
  }
  if (line.length > 0) {
    lineProcessor.processLine(line)
  }
}

if (!lineProcessor) {
  console.error('input is empty?')
} else {
  const [gamma, epsilon] = lineProcessor.currentGammaAndEpsilon
  console.log('gamma', gamma)
  console.log('epsilon', epsilon)
  const powerConsumption = gamma * epsilon
  console.log('power consumption', powerConsumption)
}
