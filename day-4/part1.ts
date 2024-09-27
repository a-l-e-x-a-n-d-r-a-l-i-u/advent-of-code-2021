import { loadInput } from "./parser.js";

const [drawnNumbers, allBoards] = loadInput();

for (const number of drawnNumbers) {
  console.log('Checking for', number)
  for (const board of allBoards) {
      if (checkBingo(number, board.cells) === true) break;
  }
}

const marker = -1;
// Include error checks to make sure marker doesn't exist in drawnNumbers and marker doesn't exist in BingoBoard already!

function markNumber(matrix: number[][], currentNumber: number): number[][] {
  return matrix.map(row => 
    row.map(cell => (cell === currentNumber ? marker : cell))
  );
}

function checkBingo(currentNumber: number, matrix: number[][]): boolean {
  const markedMatrix = markNumber(matrix, currentNumber);

  const hasWon = markedMatrix.some(row => row.every(cell => cell === marker)) // Winning row
    || markedMatrix[0].map((_, index) => markedMatrix.every(row => row[index] === marker)).some(result => result); // Winning column


  if (hasWon) {
  const sumOfRemainingNumbers = markedMatrix.flat().reduce((acc, cell) => {
    if (cell !== marker) {
        acc = acc + cell
      }
    return acc
  }, 0)
  
  console.log('Winning board:', matrix, markedMatrix)
  console.log('Current number:', currentNumber)
  console.log('Sum of remaining numbers:', sumOfRemainingNumbers)
  console.log('Final score:', currentNumber * sumOfRemainingNumbers)
  return true;
  }
  return false
}