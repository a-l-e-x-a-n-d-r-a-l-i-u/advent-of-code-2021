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

/** STEPS
 * 3. Separate out each line break into matrixes
 * 4. Check that each matrix is 5 elements by 5 elements
 */
const boardsInput = inputContents.slice(1) // Omit element at index 0
  .map((str) => str.split(',')) // Turn array of strings into an array of array of strings
    .split('\n\n')
    .map((rawBoard) => rawBoard.trim())
    .filter((rawBoard) => rawBoard.length > 0)

  const allBoards = boardsInput.map(
    (rawBoard) => new BingoBoard(rawBoard.split('\n').map((rawRow) => rawRow.split(/ +/g).map(Number))),
  )
  return [drawnNumbers, allBoards]
}