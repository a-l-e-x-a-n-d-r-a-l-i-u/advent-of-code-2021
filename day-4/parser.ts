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
  .split(/\n\s*\n/) // Chunk it by empty linespaces with a regular expression -- so inputContents is not a string but an array of strings now

  const drawnNumbers: number[] = inputContents[0]
    .split(',')
    .map(Number)
    // Don't need to .trim() cause there are no empty spaces but you may as well trim for data cleaning anyway
    
    if (drawnNumbers.length < 5) {
      throw new Error('There are not enough drawn numbers to complete this game of bingo')
    }

    
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