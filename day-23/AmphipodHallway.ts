import { List, Record, Seq, Range } from 'immutable'

const FORBIDDEN_STOP_LOCATIONS = new Set<HallwayLocation>([2, 4, 6, 8])
/**
 * 0-10 (inclusive) is the hallway from left to right. 11-12 is Room A. 13-14 B. 15-16 C. 17-18 D.
 */
type HallwayLocation = number
type Amphipod = 'A' | 'B' | 'C' | 'D'
const AmphipodHallwayBase = Record({
  A: List<HallwayLocation>().setSize(2),
  B: List<HallwayLocation>().setSize(2),
  C: List<HallwayLocation>().setSize(2),
  D: List<HallwayLocation>().setSize(2),
})
export class AmphipodHallway extends AmphipodHallwayBase {
  protected targets(type: Amphipod): HallwayLocation[] {
    if (type === 'A') {
      return [11, 12]
    }
    if (type === 'B') {
      return [13, 14]
    }
    if (type === 'C') {
      return [15, 16]
    }
    if (type === 'D') {
      return [17, 18]
    }
    throw new Error('invalid room type')
  }

  protected neighbours(location: HallwayLocation): HallwayLocation[] {
    if (location === 0) {
      return [1]
    }
    if (location === 1) {
      return [0, 2]
    }
    if (location === 2) {
      return [1, 3, 11]
    }
    if (location === 3) {
      return [2, 4]
    }
    if (location === 4) {
      return [3, 5, 13]
    }
    if (location === 5) {
      return [4, 6]
    }
    if (location === 6) {
      return [5, 7, 15]
    }
    if (location === 7) {
      return [6, 8]
    }
    if (location === 8) {
      return [7, 9, 17]
    }
    if (location === 9) {
      return [8, 10]
    }
    if (location === 10) {
      return [9]
    }
    if (location === 11) {
      return [2, 12]
    }
    if (location === 12) {
      return [11]
    }
    if (location === 13) {
      return [4, 14]
    }
    if (location === 14) {
      return [13]
    }
    if (location === 15) {
      return [6, 16]
    }
    if (location === 16) {
      return [15]
    }
    if (location === 17) {
      return [8, 18]
    }
    if (location === 18) {
      return [17]
    }
    throw new Error('not a location')
  }

  protected distanceFromTo(from: HallwayLocation, to: HallwayLocation): number {
    if (from === 11) {
      return this.distanceFromTo(2, to) + 1
    }
    if (from === 12) {
      return this.distanceFromTo(2, to) + 2
    }
    if (from === 13) {
      return this.distanceFromTo(4, to) + 1
    }
    if (from === 14) {
      return this.distanceFromTo(4, to) + 2
    }
    if (from === 15) {
      return this.distanceFromTo(6, to) + 1
    }
    if (from === 16) {
      return this.distanceFromTo(6, to) + 2
    }
    if (from === 17) {
      return this.distanceFromTo(8, to) + 1
    }
    if (from === 18) {
      return this.distanceFromTo(8, to) + 2
    }
    if (to === 11) {
      return this.distanceFromTo(from, 2) + 1
    }
    if (to === 12) {
      return this.distanceFromTo(from, 2) + 2
    }
    if (to === 13) {
      return this.distanceFromTo(from, 4) + 1
    }
    if (to === 14) {
      return this.distanceFromTo(from, 4) + 2
    }
    if (to === 15) {
      return this.distanceFromTo(from, 6) + 1
    }
    if (to === 16) {
      return this.distanceFromTo(from, 6) + 2
    }
    if (to === 17) {
      return this.distanceFromTo(from, 8) + 1
    }
    if (to === 18) {
      return this.distanceFromTo(from, 8) + 2
    }
    return Math.abs(from - to)
  }

  protected furthestRoomPointForGuy(type: Amphipod): HallwayLocation | null {
    for (const target of Seq(this.targets(type)).reverse()) {
      if (this.whatsHere(target) !== type) {
        return target
      }
    }
    return null //room full
  }

  protected roomFullOfFriends(type: Amphipod): boolean {
    return this.targets(type).every((roomLocation) => {
      const locationContents = this.whatsHere(roomLocation)
      return locationContents === type || locationContents === '.'
    })
  }

  private allPossibleMovesForKindOfAmphipod(type: Amphipod): (readonly [AmphipodHallway, number])[] {
    const allAmphipods = Seq([this.A, this.B, this.C, this.D]).flatten() as Seq.Indexed<number>
    const moves: (readonly [AmphipodHallway, number])[] = []
    const bestPositionForThisGuy = this.furthestRoomPointForGuy(type)
    const targetRoomFullOfFriends = this.roomFullOfFriends(type)
    for (const [index, amphipodStartLocation] of this[type].entries()) {
      const possibleMoves: { state: AmphipodHallway; location: HallwayLocation; precedingCost: number }[] =
        this.neighbours(amphipodStartLocation).map((location) => ({ state: this, location, precedingCost: 0 }))
      const canOnlyGoToTarget = amphipodStartLocation <= 10
      const visitedLocations = new Set<HallwayLocation>([amphipodStartLocation])
      const alreadyHome = this.targets(type).includes(amphipodStartLocation)

      const canMove = !alreadyHome || (bestPositionForThisGuy != null && amphipodStartLocation < bestPositionForThisGuy)
      while (possibleMoves.length > 0 && canMove) {
        const tryingMove = possibleMoves.pop()!

        if (!allAmphipods.includes(tryingMove.location) && !visitedLocations.has(tryingMove.location)) {
          visitedLocations.add(tryingMove.location)
          const movedState = tryingMove.state.withMove(type, index, tryingMove.location, tryingMove.precedingCost)
          const goingToTheForbiddenZone = FORBIDDEN_STOP_LOCATIONS.has(tryingMove.location)
          const goingToTheHallway = tryingMove.location <= 10
          const goingToOwnTarget = this.targets(type).includes(tryingMove.location)
          const goingToFurthestRoomPoint =
            !alreadyHome && goingToOwnTarget && tryingMove.location === bestPositionForThisGuy
          if (
            !goingToTheForbiddenZone && //no blocking the hallway
            (goingToTheHallway || (goingToOwnTarget && targetRoomFullOfFriends && goingToFurthestRoomPoint)) && // can only go to your room
            (!canOnlyGoToTarget || goingToOwnTarget) // only go to you room after hallway
          ) {
            moves.push(movedState)
          }
          const newPossibleMoves = Seq(this.neighbours(tryingMove.location))
            .filterNot((newLocation) => visitedLocations.has(newLocation))
            .map((location) => ({
              state: movedState[0],
              location,
              precedingCost: movedState[1],
            }))
          possibleMoves.push(...newPossibleMoves)
        }
      }
    }
    return moves
  }

  public allPossibleMoves(): (readonly [AmphipodHallway, number])[] {
    const moves: (readonly [AmphipodHallway, number])[] = []

    moves.push(
      ...this.allPossibleMovesForKindOfAmphipod('A'),
      ...this.allPossibleMovesForKindOfAmphipod('B'),
      ...this.allPossibleMovesForKindOfAmphipod('C'),
      ...this.allPossibleMovesForKindOfAmphipod('D'),
    )
    return moves
  }

  public withMove(
    type: string,
    index: number,
    location: HallwayLocation,
    precedingCost: number,
  ): readonly [AmphipodHallway, number] {
    let cost = Number.POSITIVE_INFINITY
    if (type === 'A') {
      cost = 1
    } else if (type === 'B') {
      cost = 10
    } else if (type === 'C') {
      cost = 100
    } else if (type === 'D') {
      cost = 1000
    }
    return [this.setIn([type, index], location), precedingCost + cost]
  }

  public hasWon(): boolean {
    return (
      this.A.every((location) => this.targets('A').includes(location)) &&
      this.B.every((location) => this.targets('B').includes(location)) &&
      this.C.every((location) => this.targets('C').includes(location)) &&
      this.D.every((location) => this.targets('D').includes(location))
    )
  }

  public heuristic(): number {
    let total = 0
    for (const { type, cost } of [
      { type: 'A', cost: 1 },
      { type: 'B', cost: 10 },
      { type: 'C', cost: 100 },
      { type: 'D', cost: 1000 },
    ] as const) {
      const bestTarget = this.furthestRoomPointForGuy(type)
      if (bestTarget != null) {
        for (const amphipod of this[type]) {
          if (amphipod < bestTarget) {
            total += this.distanceFromTo(amphipod, bestTarget) * cost
          }
        }
      }
    }
    return total
  }

  public get asKey(): string {
    return JSON.stringify(this.toJS())
  }

  private whatsHere(location: HallwayLocation): Amphipod | '.' {
    for (const key of ['A', 'B', 'C', 'D'] as const) {
      if (this[key].contains(location)) {
        return key
      }
    }
    return '.'
  }

  public get asHallway(): string {
    const hallwayRow = Range(0, 11)
      .map((location) => this.whatsHere(location))
      .join('')
    const topRow = [11, 13, 15, 17].map((location) => this.whatsHere(location)).join('#')
    const bottomRow = [12, 14, 16, 18].map((location) => this.whatsHere(location)).join('#')
    return `${hallwayRow}\n #${topRow}# \n #${bottomRow}# `
  }
}
