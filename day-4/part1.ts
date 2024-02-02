import { readFileSync } from 'fs'

interface BingoBoard {
  cells: number[][];
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
    
    if (rows.length !== 5 || rows.some(row => row.length !== 5)) { // number of rows = 5 and length of row = 5
      throw new Error(`Invalid dimensions: Board must be 5x5 in order to play`);
    }

  drawnNumbers.forEach(number => {
    checkBingo(number, rows)
  })

    return { cells: rows } as BingoBoard;
  }))

  return [drawnNumbers, allBoards]
}

function checkBingo(currentNumber: number, matrix: number[][]): any {
  let hasWon = false;
  let sumOfRemainingNumbers: number = 0;
  let marker = -1;
  // Include error checks to make sure marker doesn't exist in drawnNumbers and marker doesn't exist in BingoBoard already!
  // Maybe marker should be declared elsewhere but leave it inside checkBingo for now

  matrix.forEach((row, index) => {
    if (hasWon) {
      return // Exit the loop
    }

    row.forEach((cell, index) => {
      if (cell === currentNumber) {
        row[index] = marker // If match, then turn cell into -1
      }
    })

    if (row.every(cell => cell === marker) || matrix.every(row => row[index] === marker)) {
      hasWon = true
    }
  })

  if (hasWon) {
    console.log('Winning board:', matrix)
    sumOfRemainingNumbers = matrix.flat().reduce((acc: number, cell) => {
        if (cell > marker) {
          acc = acc + cell
        }
      return acc
    }, 0)
    console.log('Current number:', currentNumber)
    console.log('Sum of remaining numbers:', sumOfRemainingNumbers)
    console.log('Final score:', currentNumber * sumOfRemainingNumbers)
  }

  console.log(currentNumber, 'checked!')
}

loadInput()