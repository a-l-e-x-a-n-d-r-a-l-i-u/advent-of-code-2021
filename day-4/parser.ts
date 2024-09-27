import { readFileSync } from 'fs'

export interface BingoBoard {
  cells: number[][];
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
  .map(matrixString => {
    const rows = matrixString.trim().split('\n') // Each line break becomes a row in a matrix
    .map(row => row.trim().split(/\s+/) // Each space delimiter becomes a cell in a row
    .map(Number)) // and the cells all start off as numbers
    
    if (rows.length !== 5 || rows.some(row => row.length !== 5)) { // number of rows = 5 and length of row = 5
      console.log(rows)
      throw new Error(`Invalid dimensions: Board must be 5x5 in order to play`);
    }

    return { cells: rows } as BingoBoard;
    
  })

  return [drawnNumbers, allBoards]
}