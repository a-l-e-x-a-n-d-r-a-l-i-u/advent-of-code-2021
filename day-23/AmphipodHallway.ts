import { List, Record, Seq, Range } from 'immutable'

function neighbours(location: HallwayLocation): HallwayLocation[] {
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
function distanceFromTo(from: HallwayLocation, to: HallwayLocation): number {
  if (from === 11) {
    return distanceFromTo(2, to) + 1
  }
  if (from === 12) {
    return distanceFromTo(2, to) + 2
  }
  if (from === 13) {
    return distanceFromTo(4, to) + 1
  }
  if (from === 14) {
    return distanceFromTo(4, to) + 2
  }
  if (from === 15) {
    return distanceFromTo(6, to) + 1
  }
  if (from === 16) {
    return distanceFromTo(6, to) + 2
  }
  if (from === 17) {
    return distanceFromTo(8, to) + 1
  }
  if (from === 18) {
    return distanceFromTo(8, to) + 2
  }
  if (to === 11) {
    return distanceFromTo(from, 2) + 1
  }
  if (to === 12) {
    return distanceFromTo(from, 2) + 2
  }
  if (to === 13) {
    return distanceFromTo(from, 4) + 1
  }
  if (to === 14) {
    return distanceFromTo(from, 4) + 2
  }
  if (to === 15) {
    return distanceFromTo(from, 6) + 1
  }
  if (to === 16) {
    return distanceFromTo(from, 6) + 2
  }
  if (to === 17) {
    return distanceFromTo(from, 8) + 1
  }
  if (to === 18) {
    return distanceFromTo(from, 8) + 2
  }
  return Math.abs(from - to)
}
const FORBIDDEN_STOP_LOCATIONS: HallwayLocation[] = [2, 4, 6, 8]
const TARGETS = {
  A: [11, 12],
  B: [13, 14],
  C: [15, 16],
  D: [17, 18],
}
/**
 * 0-10 (inclusive) is the hallway from left to right. 11-12 is Room A. 13-14 B. 15-16 C. 17-18 D.
 */
type HallwayLocation = number
const AmphipodHallwayBase = Record({
  A: List<HallwayLocation>().setSize(2),
  B: List<HallwayLocation>().setSize(2),
  C: List<HallwayLocation>().setSize(2),
  D: List<HallwayLocation>().setSize(2),
})
export class AmphipodHallway extends AmphipodHallwayBase {
  private allPossibleMovesForKindOfAmphipod(type: 'A' | 'B' | 'C' | 'D'): (readonly [AmphipodHallway, number])[] {
    const allAmphipods = Seq([this.A, this.B, this.C, this.D]).flatten() as Seq.Indexed<number>
    const moves: (readonly [AmphipodHallway, number])[] = []
    if (TARGETS[type].includes(this[type].get(0)!) && TARGETS[type].includes(this[type].get(1)!)) {
      // room complete. LOCKED
      return moves
    }
    for (const [index, amphipodStartLocation] of this[type].entries()) {
      const possibleMoves: { state: AmphipodHallway; location: HallwayLocation; precedingCost: number }[] = neighbours(
        amphipodStartLocation,
      ).map((location) => ({ state: this, location, precedingCost: 0 }))
      const canOnlyGoToTarget = amphipodStartLocation <= 10
      const visitedLocations = new Set<HallwayLocation>([amphipodStartLocation])
      const alreadyHome = TARGETS[type].includes(amphipodStartLocation)
      const otherLocationIfAlreadyHome = TARGETS[type].find((location) => location !== amphipodStartLocation)
      const canMove =
        !alreadyHome ||
        (this.whatsHere(otherLocationIfAlreadyHome!) !== type && TARGETS[type][0] === amphipodStartLocation)
      while (possibleMoves.length > 0 && canMove) {
        const tryingMove = possibleMoves.pop()!
        const goingToOwnTarget = TARGETS[type].includes(tryingMove.location)
        if (!allAmphipods.includes(tryingMove.location) && !visitedLocations.has(tryingMove.location)) {
          visitedLocations.add(tryingMove.location)
          const movedState = tryingMove.state.withMove(type, index, tryingMove.location, tryingMove.precedingCost)
          const goingToTheForbiddenZone = FORBIDDEN_STOP_LOCATIONS.includes(tryingMove.location)
          const goingToTheHallway = tryingMove.location <= 10
          const otherLocationIfGoingHome = TARGETS[type].find((location) => location !== tryingMove.location)
          const otherGuyInTargetRoomIsAFriend =
            this.whatsHere(otherLocationIfGoingHome!) === type || this.whatsHere(otherLocationIfGoingHome!) === '.'
          const furthestRoomPoint = this.whatsHere(TARGETS[type][1]) === '.' ? TARGETS[type][1] : TARGETS[type][0]
          const goingToFurthestRoomPoint = tryingMove.location === furthestRoomPoint
          if (
            !goingToTheForbiddenZone && //no blocking the hallway
            (goingToTheHallway || (goingToOwnTarget && otherGuyInTargetRoomIsAFriend && goingToFurthestRoomPoint)) && // can only go to your room
            (!canOnlyGoToTarget || goingToOwnTarget) // only go to you room after hallway
          ) {
            moves.push(movedState)
          }
          const newPossibleMoves = Seq(neighbours(tryingMove.location))
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
      this.A.contains(TARGETS.A[0]) &&
      this.A.contains(TARGETS.A[1]) &&
      this.B.contains(TARGETS.B[0]) &&
      this.B.contains(TARGETS.B[1]) &&
      this.C.contains(TARGETS.C[0]) &&
      this.C.contains(TARGETS.C[1]) &&
      this.D.contains(TARGETS.D[0]) &&
      this.D.contains(TARGETS.D[1])
    )
  }

  public heuristic(): number {
    let total = 0
    for (const amphipod of this.A) {
      if (!TARGETS.A.includes(amphipod)) {
        total += distanceFromTo(amphipod, TARGETS.A[1])
      } else if (amphipod === TARGETS.A[0] && !this.A.contains(TARGETS.A[1])) {
        total += 1
      }
    }
    for (const amphipod of this.B) {
      if (!TARGETS.B.includes(amphipod)) {
        total += distanceFromTo(amphipod, TARGETS.B[1]) * 10
      } else if (amphipod === TARGETS.B[0] && !this.B.contains(TARGETS.B[1])) {
        total += 10
      }
    }
    for (const amphipod of this.C) {
      if (!TARGETS.C.includes(amphipod)) {
        total += distanceFromTo(amphipod, TARGETS.C[1]) * 100
      } else if (amphipod === TARGETS.C[0] && !this.C.contains(TARGETS.C[1])) {
        total += 100
      }
    }
    for (const amphipod of this.D) {
      if (!TARGETS.D.includes(amphipod)) {
        total += distanceFromTo(amphipod, TARGETS.D[1]) * 1000
      } else if (amphipod === TARGETS.D[0] && !this.D.contains(TARGETS.D[1])) {
        total += 1000
      }
    }
    return total
  }

  public get asKey(): string {
    return JSON.stringify(this.toJS())
  }

  private whatsHere(location: HallwayLocation): 'A' | 'B' | 'C' | 'D' | '.' {
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
