import { loadInput } from './parser.js'

const [drawnNumbers, allBoards] = loadInput()

for (const drawnNumber of drawnNumbers) {
  console.log('drawing', drawnNumber)
  for (const [index, board] of allBoards.entries()) {
    board.markThisNumber(drawnNumber)
    if (board.hasWon) {
      console.log('board has won', index)
      const winningValue = drawnNumber * board.sumOfAllUnmarked
      console.log('winning board value', winningValue)
      process.exit()
    }
  }
}
