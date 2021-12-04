import { readFileSync } from 'fs'

const allLines = readFileSync('input', { encoding: 'utf-8' })
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line.length > 0)
  .map(Number)

let totalIncreases = 0

for (const [index, currentLine] of allLines.entries()) {
  if (index !== 0) {
    const previousLine = allLines[index - 1]
    if (currentLine > previousLine) {
      totalIncreases += 1
    }
  }
}

console.log('total increases', totalIncreases)
