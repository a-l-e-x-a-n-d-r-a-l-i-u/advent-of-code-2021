import { loadInput } from './common.js'

let horizontal = 0
let depth = 0
let aim = 0

const commands = loadInput()

for (const command of commands) {
  if (command.direction === 'forward') {
    horizontal += command.amount
    depth += command.amount * aim
  } else if (command.direction === 'up') {
    aim -= command.amount
  } else if (command.direction === 'down') {
    aim += command.amount
  }
}

console.log('final horizontal', horizontal)
console.log('final depth', depth)
console.log('final aim', aim)
console.log('final result', horizontal * depth)
