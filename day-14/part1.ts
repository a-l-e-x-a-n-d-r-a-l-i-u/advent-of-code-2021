import { loadInput } from './load.js'
import { applyRules } from './polymer.js'

const input = loadInput()

let currentString = input.template
console.log('initial string', currentString.join(''))

for (let count = 1; count <= 10; count += 1) {
  currentString = applyRules(currentString, input.rules)
  console.log('string length after step', count, ':', currentString.size)
}

const counts = currentString.countBy((char) => char)
console.log('counts', counts.toJSON())

const max = counts.max() || 0
const min = counts.min() || 0
console.log('result', max - min)
