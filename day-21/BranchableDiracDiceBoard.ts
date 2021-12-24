import { isList, List } from 'immutable'
import { Player } from './load.js'

interface PlayerState {
  position: number
  score: number
}
const POTENTIAL_DIE_GROUPS = [
  {
    sum: 3,
    weight: 1, // 1, 1, 1
  },
  {
    sum: 4,
    weight: 3, // 1, 1, 2
  },
  {
    sum: 5,
    weight: 6, // 1, 2, 2
  },
  {
    sum: 6,
    weight: 7, // 2, 2, 2 + 1, 2, 3
  },
  {
    sum: 7,
    weight: 6, // 2, 2, 3 + 1, 3, 3
  },
  {
    sum: 8,
    weight: 3, // 2, 3, 3
  },
  {
    sum: 9,
    weight: 1, // 3, 3, 3
  },
]
export class BranchableDiracDiceBoard {
  private playerStates = new Map<string, PlayerState>()

  private playerOrder: string[] = []

  constructor(initialState: List<Player> | BranchableDiracDiceBoard) {
    if (isList(initialState)) {
      for (const player of initialState) {
        this.playerStates.set(player.name, {
          position: player.startingPosition - 1, // we zero index this
          score: 0,
        })
        this.playerOrder.push(player.name)
      }
    } else {
      this.playerStates = new Map(initialState.playerStates)
      this.playerOrder = [...initialState.playerOrder]
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

  public *calculateNextPotentialTurns(): Generator<
    {
      player: string
      roll: number
      state: PlayerState
      game: BranchableDiracDiceBoard
      universesWhereThisHappens: number
    },
    void
  > {
    const player = this.nextPlayer()
    const playerState = this.playerStates.get(player)
    if (playerState == null) {
      throw new Error('could not find player state')
    }

    for (const roll of POTENTIAL_DIE_GROUPS) {
      const branchedGameState = new BranchableDiracDiceBoard(this)
      const endingPosition = (playerState.position + roll.sum) % 10
      const addedScore = endingPosition + 1
      const newState: PlayerState = {
        position: endingPosition,
        score: playerState.score + addedScore,
      }
      branchedGameState.playerStates.set(player, newState)
      yield { player, roll: roll.sum, state: newState, game: branchedGameState, universesWhereThisHappens: roll.weight }
    }
  }

  public getCurrentPlayerState(player: string): PlayerState {
    const state = this.playerStates.get(player)
    if (state == null) {
      throw new Error('could not find player state')
    }
    return state
  }
}
