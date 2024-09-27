import { loadInput } from "./parser.js";

const [drawnNumbers, allBoards] = loadInput();

let gameWon = false; // Flag to stop the game once a winning board is found

for (const number of drawnNumbers) {
  console.log('Checking for', number)

  if (gameWon) break;

  for (const board of allBoards) {
      gameWon = checkBingo(number, board.cells);
      if (gameWon) break;
  }
}

function checkBingo(currentNumber: number, matrix: number[][]): boolean {
  let marker = -1;
  // Include error checks to make sure marker doesn't exist in drawnNumbers and marker doesn't exist in BingoBoard already!
  // Maybe marker should be declared in parser but leave it inside checkBingo for now

  const hasWonInRows = matrix.some(row => row.every(cell => cell === marker));
  const hasWonInColumns = matrix[0].map((_, index) => matrix.every(row => row[index] === marker)).some(result => result);

  if (hasWonInRows || hasWonInColumns) {
    console.log('Winning board:', matrix)
    const sumOfRemainingNumbers = matrix.flat().reduce((acc, cell) => {
        if (cell !== marker) {
          acc = acc + cell
        }
      return acc
    }, 0)
    console.log('Current number:', currentNumber)
    console.log('Sum of remaining numbers:', sumOfRemainingNumbers)
    console.log('Final score:', currentNumber * sumOfRemainingNumbers)
    return true; // Return true if a board has won
  }
  return false; // Return false if no win yet
}

//Edge case, what if there are multiple winners in for a given current number?