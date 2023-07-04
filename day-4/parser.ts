import { readFileSync } from 'fs'

interface BingoBoard {
  cells: (number | boolean)[][];
}

export function loadInput(): [number[], BingoBoard[]] {
  const inputContents = readFileSync('input', { encoding: 'utf-8' })
  .split(/\n\s*\n/) // Chunk it by empty linespaces with a regular expression -- so inputContents is not a string but an array of strings now

  const drawnNumbers: number[] = inputContents[0]
  .trim()
  .split(',')
  .map(Number)
  if (drawnNumbers.length < 5) {
    throw new Error('There are not enough drawn numbers to complete this game')
  }

const allBoards: BingoBoard[] = inputContents.slice(1) // Omitting the drawn numbers at index 0 gives you an array of matrix strings
.map((matrixString => {
  const rows = matrixString.split('\n') // Each line break becomes a row in a matrix
  .map(row => row.split(/\s+/) // Each space delimiter becomes a cell in a row
  .map(Number)) // and the cells all start off as numbers

  if (rows.length !== 5) {
    throw new Error(`Invalid number of columns: ${rows.length}`);
  }

  return { cells: rows } as BingoBoard;
}))

return [drawnNumbers, allBoards]
}

/** Please include error handling to check that each matrix is 5 elements by 5 elements
 */

