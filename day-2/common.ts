import { readFileSync } from 'fs'

export interface Command {
  direction: 'up' | 'down' | 'forward'
  amount: number
}

//Cleaning the data
export const cleanInput: Command[] = readFileSync('input', { encoding: 'utf-8' })
    .split('\n')
    .map((line: string) => line.trim())
    .filter((line: string) => line.length > 0)
    .map((line) => {
      const parts = line.split(' ')
      if (parts.length !== 2) {
        throw new Error('invalid input, could not parse')
      }
      const direction = parts[0]
      if (direction !== 'up' && direction !== 'down' && direction !== 'forward') {
        throw new Error(`invalid direction found: ${direction}`)
      }
      return { direction, amount: Number(parts[1]) }

    })

    console.log('input:', cleanInput)



    