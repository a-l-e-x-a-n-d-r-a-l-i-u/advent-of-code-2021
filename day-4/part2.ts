import { loadInput, BingoBoard } from './parser.js';
import { markNumber, checkBingo } from './part1.js';

const [drawnNumbers, allBoards]: [number[], BingoBoard[]] = loadInput();
const marker = -1;

let winnableBoards = new Set<BingoBoard>();
let lastWonBoard: BingoBoard | null = null;
let lastWinningNumber: number | null = null;

for (const number of drawnNumbers) {
  console.log('Checking for', number);
  
  allBoards.forEach((board: BingoBoard) => {
    if (!winnableBoards.has(board)) { // Check only remaining boards
      board.cells = markNumber(board.cells, number); // Update the board's cells
      
      if (checkBingo(number, board.cells)) {
        winnableBoards.add(board); // Mark the board as won
        lastWonBoard = board; // Keep track of the last board to win
        lastWinningNumber = number; // Update lastWinningNumber to the winning number
      }
    }
  });

  // If all boards have won, break the loop
  if (winnableBoards.size === allBoards.length) {
    console.log("All boards have won. Last winning board found.");
    break;
  }
}

// Final checks after loop
if (lastWonBoard !== null && lastWinningNumber !== null) {
  const sumOfRemainingNumbers = (lastWonBoard as BingoBoard).cells.flat().reduce((acc, cell) => {
    return cell !== marker ? acc + cell : acc; // Accumulate unmarked cells
  }, 0);

  console.log('Last winning board:', (lastWonBoard as BingoBoard).cells);
  console.log('Last winning number:', lastWinningNumber);
  console.log('Sum of remaining numbers:', sumOfRemainingNumbers);
  console.log('Final score of last winning board:', lastWinningNumber * sumOfRemainingNumbers);
} else {
  throw new Error('No board ever won');
}