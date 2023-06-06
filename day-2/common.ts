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
      const [direction, amount] = line.split(' ');
      return {
        direction: direction, amount: Number(amount)
      }
    })

    console.log('input:', cleanInput)
    