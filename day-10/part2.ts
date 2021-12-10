import { checkLine, ChunkError } from './chunk-parser.js'
import { Char, loadInput } from './load.js'

function stackToScore(stack: Char[]): number {
  let totalScore = 0
  for (const char of stack.reverse()) {
    totalScore *= 5
    if (char === '(') {
      totalScore += 1
    } else if (char === '[') {
      totalScore += 2
    } else if (char === '{') {
      totalScore += 3
    } else if (char === '<') {
      totalScore += 4
    }
  }
  return totalScore
}

const input = loadInput()

const allScores: number[] = []

for (const line of input) {
  try {
    const remainingStack = checkLine(line)
    allScores.push(stackToScore(remainingStack))
  } catch (error) {
    if (error instanceof ChunkError) {
      //ignore
    } else {
      throw error
    }
  }
}
allScores.sort((a, b) => b - a)

const middleScore = allScores[Math.floor(allScores.length / 2)]
console.log('middle score', middleScore)
