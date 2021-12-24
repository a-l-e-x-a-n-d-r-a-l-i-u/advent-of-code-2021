import { DiracDiceBoard } from './DiracDiceBoard.js'
import { loadInput } from './load.js'

const input = loadInput()

const game = new DiracDiceBoard(input)

let winningPlayer: string | null = null

while (!winningPlayer) {
  const turnResult = game.calculateNextTurn()
  if (turnResult.state.score >= 1000) {
    winningPlayer = turnResult.player
    console.log('player', turnResult.player, 'won')
  }
}

const losingPlayer = input.find((player) => player.name !== winningPlayer)?.name
if (!losingPlayer) {
  throw new Error('could not find losing player')
}
const losingScore = game.getCurrentPlayerState(losingPlayer).score
const diceRolled = game.dice.numberOfRolls
console.log('losing score', losingScore)
console.log('dice rolled', diceRolled)
console.log('result', losingScore * diceRolled)
