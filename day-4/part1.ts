import { loadInput } from "./parser.js";

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
  }
  console.log(currentNumber, 'checked!')
}

//Edge case, what if there are multiple winners in for a given current number?