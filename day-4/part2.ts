import { BingoBoard } from './BingoBoard.js'
import { loadInput } from './parser.js'

const [drawnNumbers, allBoards] = loadInput()

const winnableBoards = new Set(allBoards)
let lastWonBoard: { board: BingoBoard; drawnNumber: number } | null = null
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
