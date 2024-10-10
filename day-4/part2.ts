import { BingoBoard } from './parser.js'; // Import the BingoBoard interface
import { loadInput } from './parser.js'
import { markNumber, checkBingo } from './part1.js'

const [drawnNumbers, allBoards] = loadInput();
const marker = -1;

let winnableBoards = new Set<number>();
let lastWonBoard: BingoBoard | null = null;
let lastWinningNumber = null;

for (const number of drawnNumbers) {
  console.log('Checking for', number);
  
  allBoards.forEach((board, index) => {
    if (!winnableBoards.has(index)) { // Check only remaining boards
      board.cells = markNumber(board.cells, number); // Update the board's cells
      
      if (checkBingo(number, board.cells)) {
        winnableBoards.add(index); // Mark the board as won
        lastWonBoard = board; // Keep track of the last board to win
        lastWinningNumber = number;
      }
    }
  });

  if (winnableBoards.size === allBoards.length) {
    console.log("All boards have won. Last winning board found.");
    break;
  }
}

if (lastWonBoard && lastWinningNumber !== null) {
  const sumOfRemainingNumbers = lastWonBoard.cells.flat().reduce((acc, cell) => {
    return cell !== marker ? acc + cell : acc;
  }, 0);

  console.log('Last winning board:', lastWonBoard.cells);
  console.log('Last winning number:', lastWinningNumber);
  console.log('Sum of remaining numbers:', sumOfRemainingNumbers);
  console.log('Final score of last winning board:', lastWinningNumber * sumOfRemainingNumbers);
}

winnableBoards = new Set(allBoards)
lastWonBoard = null as { board: BingoBoard; drawnNumber: number } | null;
for (const drawnNumber of drawnNumbers) {
  console.log('drawing', drawnNumber)
  for (const board of winnableBoards) {
    board.markThisNumber(drawnNumber)
    if (board.hasWon) {
      // console.log('board has won', index)
      winnableBoards.delete(board)
      lastWonBoard = { board, drawnNumber }
    }
  }
}
if (lastWonBoard == null) {
  throw new Error('no board ever won')
}
const winningValue = lastWonBoard.drawnNumber * lastWonBoard.board.sumOfAllUnmarked
console.log('losing board value', winningValue)