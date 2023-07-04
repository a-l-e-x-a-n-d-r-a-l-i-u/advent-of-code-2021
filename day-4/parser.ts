import { readFileSync } from 'fs'
import { BingoBoard } from './BingoBoard.js'

/** STEPS
 * 1. Separate out the first line into a comma separated array
 * 2. Check that first line has minimum 5 elements
 * 
 * 3. Separate out each line break into matrixes
 * 4. Check that each matrix is 5 elements by 5 elements
 */

export function loadInput(): [number[], BingoBoard[]] {
  const inputContents = readFileSync('input', { encoding: 'utf-8' })

  const firstLineBreak = inputContents.indexOf('\n')
  if (firstLineBreak < 0) {
    throw new Error('could not parse input')
  }
  const drawnNumbers = inputContents
    .slice(0, firstLineBreak)
    .split(',')
    .map((draw) => Number(draw.trim()))

  const boardsInput = inputContents
    .slice(firstLineBreak)
    .split('\n\n')
    .map((rawBoard) => rawBoard.trim())
    .filter((rawBoard) => rawBoard.length > 0)

  const allBoards = boardsInput.map(
    (rawBoard) => new BingoBoard(rawBoard.split('\n').map((rawRow) => rawRow.split(/ +/g).map(Number))),
  )
  return [drawnNumbers, allBoards]
}