import { loadInput } from "./parser.js";

const [drawnNumbers, allBoards] = loadInput();

for (const number of drawnNumbers) {
  console.log('Checking for', number)
  for (const board of allBoards) {
      if (checkBingo(number, board.cells) === true) break;
  }
}

function checkBingo(currentNumber: number, matrix: number[][]): boolean {
  let marker = -1;
  // Include error checks to make sure marker doesn't exist in drawnNumbers and marker doesn't exist in BingoBoard already!
  // Maybe marker should be declared in parser but leave it inside checkBingo for now

  const hasWon = matrix.some(row => row.every(cell => cell === marker)) // Winning row
    || matrix[0].map((_, index) => matrix.every(row => row[index] === marker)).some(result => result); // Winning column

  if (!hasWon) return false;

  const sumOfRemainingNumbers = matrix.flat().reduce((acc, cell) => {
    if (cell !== marker) {
        acc = acc + cell
      }
    return acc
  }, 0)
  
  console.log('Winning board:', matrix)
  console.log('Current number:', currentNumber)
  console.log('Sum of remaining numbers:', sumOfRemainingNumbers)
  console.log('Final score:', currentNumber * sumOfRemainingNumbers)
  return true; // Return true if a board has won
  }

//Edge case, what if there are multiple winners in for a given current number?