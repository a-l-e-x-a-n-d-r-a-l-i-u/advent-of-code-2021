import { readFileSync } from 'fs'

interface BingoBoard {
  cells: (number | boolean)[][];
}

function loadInput(): [number[], BingoBoard[]] {
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

  if (rows.length !== 5 || rows.some(row => row.length !== 5)) {
    throw new Error(`Invalid dimensions: Board must be 5x5 in order to play`);
  }

  drawnNumbers.forEach(number => {
    checkBingo(number, rows)
  })

  return { cells: rows } as BingoBoard;
}))

return [drawnNumbers, allBoards]
}

function checkBingo(currentNumber: number, matrix: (number|boolean)[][]): any {
  let hasWon = false;
  let sumOfRemainingNumbers: number = 0;

  matrix.forEach(row => {
    if (hasWon) {
      return // Exit the loop
    } 

    row.forEach((cell, index) => {
      if (cell === currentNumber) {
        row[index] = true // If match, then turn cell number into boolean "true"
      }
    })

    if (row.every(cell => cell === true) || matrix.every(row => row[index] === true)) {
      hasWon = true
    }

    // Edge case: What if more than one bingo board wins at a given time?
  })

  if (hasWon) {
    sumOfRemainingNumbers = matrix.flat().reduce((acc: number, cell) => {
      if (typeof cell === 'number') {
        acc = acc + cell
      }

      return acc
    }, 0)
  }

  console.log('final score:', currentNumber * sumOfRemainingNumbers)
}