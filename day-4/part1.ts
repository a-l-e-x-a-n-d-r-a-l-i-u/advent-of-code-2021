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
  .map(matrixString => {
    const rows = matrixString.split('\n') // Each line break becomes a row in a matrix
    .map(row => row.split(/\s+/) // Each space delimiter becomes a cell in a row
    .map(Number)) // and the cells all start off as numbers
    
    if (rows.length !== 5 || rows.some(row => row.length !== 5)) { // number of rows = 5 and length of row = 5
      console.log(rows)
      throw new Error(`Invalid dimensions: Board must be 5x5 in order to play`);
    }

    return { cells: rows } as BingoBoard;
    
  })

  return [drawnNumbers, allBoards]
}

const [drawnNumbers, allBoards] = loadInput();

for (const number of drawnNumbers) {
  for (const board of allBoards) {
      checkBingo(number, board.cells);
  }
}

function checkBingo(currentNumber: number, matrix: number[][]): void {
  let marker = -1;
  // Include error checks to make sure marker doesn't exist in drawnNumbers and marker doesn't exist in BingoBoard already!
  // Maybe marker should be declared elsewhere but leave it inside checkBingo for now

  const hasWonInRows = matrix.some(row => row.every(cell => cell === marker));
  const hasWonInColumns = matrix[0].map((_, index) => matrix.every(row => row[index] === marker)).some(result => result);

  if (hasWonInRows || hasWonInColumns) {
    console.log('Winning board:', matrix)
    const sumOfRemainingNumbers = matrix.flat().reduce((acc, cell) => {
        if (cell > marker) {
          acc = acc + cell
        }
      return acc
    }, 0)
    console.log('Current number:', currentNumber)
    console.log('Sum of remaining numbers:', sumOfRemainingNumbers)
    console.log('Final score:', currentNumber * sumOfRemainingNumbers)
  } else {
      console.log('Drawing next number...');
  }
  console.log(currentNumber, 'checked!')
}

//Edge case, what if there are multiple winners in for a given current number?