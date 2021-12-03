import { readFileSync } from 'fs'

const allLines = readFileSync('input', { encoding: 'utf-8' })
  .split('\n')
  .filter((line, _, array) => line.length === array[0].length)
function filterToSignificantBits(lines: string[], most: boolean, index: number): string[] {
  const count = lines.reduce((total, currentLine) => (currentLine[index] === '1' ? total + 1 : total), 0)
  let wantedBit: '1' | '0'
  if (count >= lines.length / 2) {
    wantedBit = most ? '1' : '0'
  } else {
    wantedBit = most ? '0' : '1'
  }
  return lines.filter((line) => line[index] === wantedBit)
}

function filterToOneResult(most: boolean): string {
  let potentialLines = allLines
  let i = 0
  while (potentialLines.length > 1) {
    potentialLines = filterToSignificantBits(potentialLines, most, i)
    i += 1
  }
  const result = potentialLines.pop()
  if (!result) {
    throw new Error('could not find significant bit')
  }
  return result
}

const oxygenBinary = filterToOneResult(true)
const co2Binary = filterToOneResult(false)
const oxygen = parseInt(oxygenBinary, 2)
const co2 = parseInt(co2Binary, 2)

console.log('oxygen', oxygen)
console.log('co2', co2)

const lifeSupport = oxygen * co2

console.log('life support', lifeSupport)
