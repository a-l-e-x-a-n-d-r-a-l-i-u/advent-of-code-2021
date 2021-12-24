import { List } from 'immutable'
import { DeterministicDice } from './DeterministicDice.js'
import { Player } from './load.js'

interface PlayerState {
  position: number
  score: number
}
export class DiracDiceBoard {
  private playerStates = new Map<string, PlayerState>()

  private playerOrder: string[] = []

  public readonly dice = new DeterministicDice()

  constructor(initialState: List<Player>) {
    for (const player of initialState) {
      this.playerStates.set(player.name, {
        position: player.startingPosition - 1, // we zero index this
        score: 0,
      })
      this.playerOrder.push(player.name)
    }
  }

  public nextPlayer(): string {
    const next = this.playerOrder.shift()
    if (next == null) {
      throw new Error('could not find next player')
    }
    this.playerOrder.push(next)
    return next
  }

  public calculateNextTurn(): { player: string; roll: number; state: PlayerState } {
    const player = this.nextPlayer()
    const playerState = this.playerStates.get(player)
    if (playerState == null) {
      throw new Error('could not find player state')
    }
    const roll = this.dice.nextThree()
    const endingPosition = (playerState.position + roll) % 10
    const addedScore = endingPosition + 1
    const newState: PlayerState = {
      position: endingPosition,
      score: playerState.score + addedScore,
    }
    this.playerStates.set(player, newState)
    return { player, roll, state: newState }
  }

  public getCurrentPlayerState(player: string): PlayerState {
    const state = this.playerStates.get(player)
    if (state == null) {
      throw new Error('could not find player state')
    }
    return state
  }
}
