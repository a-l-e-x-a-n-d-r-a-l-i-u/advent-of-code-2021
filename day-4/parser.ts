import { readFileSync } from 'fs'
import { BingoBoard } from './BingoBoard.js'

export function loadInput(): [number[], BingoBoard[]] {
  const inputContents = readFileSync('input', { encoding: 'utf-8' })
  .split(/\n\s*\n/) // Chunk it by empty linespaces with a regular expression -- so inputContents is not a string but an array of strings now

  const drawnNumbers: number[] = inputContents[0]
  .trim()
  .split(',')
  .map(Number)
  if (drawnNumbers.length < 5) {
    throw new Error('There are not enough drawn numbers to complete this game of bingo')
  }

const boardInput = inputContents.slice(1) // Omitting the drawn numbers at index 0 gives you an array of matrix strings
const allBoards = boardInput.map(
  (matrixString) => new BingoBoard(matrixString.split('\n').map((row) => row.split(/ +/g).map(Number))),
)

return [drawnNumbers, allBoards]
}