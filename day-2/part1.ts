import { loadInput } from './common.js'

let horizontal = 0
let depth = 0

const commands = loadInput()

for (const command of commands) {
  if (command.direction === 'forward') {
    horizontal += command.amount
  } else if (command.direction === 'up') {
    depth -= command.amount
  } else if (command.direction === 'down') {
    depth += command.amount
  }
}

console.log('final horizontal', horizontal)
console.log('final depth', depth)
console.log('final result', horizontal * depth)
