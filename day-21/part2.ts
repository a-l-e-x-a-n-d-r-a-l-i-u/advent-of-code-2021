import { BranchableDiracDiceBoard } from './BranchableDiracDiceBoard.js'
import { loadInput } from './load.js'

const input = loadInput()

const game = new BranchableDiracDiceBoard(input)

function countWinningGameState(
  boardState: BranchableDiracDiceBoard,
  universesThatGotToThisState = 1,
): { [key: string]: number } {
  const wonUniverses: { [key: string]: number } = {}
  for (const nextState of boardState.calculateNextPotentialTurns()) {
    const totalUniverses = nextState.universesWhereThisHappens * universesThatGotToThisState
    if (nextState.state.score >= 21) {
      wonUniverses[nextState.player] = (wonUniverses[nextState.player] || 0) + totalUniverses
    } else {
      const count = countWinningGameState(nextState.game, totalUniverses)
      for (const [player, won] of Object.entries(count)) {
        wonUniverses[player] = (wonUniverses[player] || 0) + won
      }
    }
  }
  return wonUniverses
}

const totalResultsOfAllDieRolls = countWinningGameState(game)

console.log('result', totalResultsOfAllDieRolls)

console.log('most won universes', Math.max(...Object.values(totalResultsOfAllDieRolls)))
