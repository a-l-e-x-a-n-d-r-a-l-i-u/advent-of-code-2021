import { checkLine, ChunkError } from './chunk-parser.js'
import { loadInput } from './load.js'

const input = loadInput()

let totalScore = 0
for (const line of input) {
  try {
    checkLine(line)
  } catch (error) {
    if (error instanceof ChunkError) {
      if (error.badChar === ')') {
        totalScore += 3
      } else if (error.badChar === ']') {
        totalScore += 57
      } else if (error.badChar === '}') {
        totalScore += 1197
      } else if (error.badChar === '>') {
        totalScore += 25137
      }
    }
  }
}

console.log('total score', totalScore)
