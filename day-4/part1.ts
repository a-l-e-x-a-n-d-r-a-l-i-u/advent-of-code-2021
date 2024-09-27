import { loadInput } from "./parser.js";

const [drawnNumbers, allBoards] = loadInput();
const marker = -1;
// Include error checks to make sure marker doesn't exist in drawnNumbers and marker doesn't exist in BingoBoard already!

for (const number of drawnNumbers) {
  console.log('Checking for', number)
  for (const board of allBoards) {
    board.cells = markNumber(board.cells, number); // Update the board's cells
    if (checkBingo(number, board.cells)) break;
  }
  // If any board won, break the outer loop as well
  if (allBoards.some(board => checkBingo(number, board.cells))) break;
}

function markNumber(matrix: number[][], currentNumber: number): number[][] {
  return matrix.map(row => 
    row.map(cell => (cell === currentNumber ? marker : cell))
  );
}

function checkBingo(currentNumber: number, matrix: number[][]): boolean {
  const hasWon = matrix.some(row => row.every(cell => cell === marker)) // Winning row
    || matrix[0].map((_, index) => matrix.every(row => row[index] === marker)).some(result => result); // Winning column

  if (hasWon) {
  const sumOfRemainingNumbers = matrix.flat().reduce((acc, cell) => {
    return cell !== marker ? acc + cell : acc;
  }, 0)
  
  console.log('Winning board:', matrix)
  console.log('Current number:', currentNumber)
  console.log('Sum of remaining numbers:', sumOfRemainingNumbers)
  console.log('Final score:', currentNumber * sumOfRemainingNumbers)
  return true;
  }
  return false
}