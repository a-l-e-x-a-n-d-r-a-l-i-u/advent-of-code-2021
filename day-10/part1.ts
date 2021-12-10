import { Char, loadInput } from './load.js'

const input = loadInput()

function checkLine(line: Char[]): Char | null {
  const stack: Char[] = []
  for (const char of line) {
    if (['[', '(', '{', '<'].includes(char)) {
      stack.push(char)
    } else {
      const lastOpening = stack.pop()
      if (
        (char === ')' && lastOpening !== '(') ||
        (char === ']' && lastOpening !== '[') ||
        (char === '}' && lastOpening !== '{') ||
        (char === '>' && lastOpening !== '<')
      ) {
        //illegal
        return char
      }
    }
  }
  return null
}

let totalScore = 0
for (const line of input) {
  const firstIllegal = checkLine(line)
  if (firstIllegal === ')') {
    totalScore += 3
  } else if (firstIllegal === ']') {
    totalScore += 57
  } else if (firstIllegal === '}') {
    totalScore += 1197
  } else if (firstIllegal === '>') {
    totalScore += 25137
  }
}

console.log('total score', totalScore)
