import { Cave } from './Cave.js'
import { Link } from './load.js'

export type CaveSystemPath = readonly Cave[]
export class CaveSystem {
  public readonly caves = new Map<string, Cave>()

  public readonly startCave!: Cave

  public readonly endCave!: Cave

  constructor(links: Link[], private canRevistSmallCaveOnceAsALittleTreat: boolean = false) {
    for (const link of links) {
      const leftCave = this.getCaveById(link[0])
      const rightCave = this.getCaveById(link[1])
      leftCave.addLink(rightCave)
      rightCave.addLink(leftCave)
      for (const cave of [leftCave, rightCave]) {
        if (cave.id === 'start') {
          this.startCave = cave
        } else if (cave.id === 'end') {
          this.endCave = cave
        }
      }
    }
    if (!this.startCave) {
      throw new Error('no start cave found')
    }
    if (!this.endCave) {
      throw new Error('no end cave found')
    }
  }

  private getCaveById(id: string): Cave {
    let cave = this.caves.get(id)
    if (!cave) {
      cave = new Cave(id)
      this.caves.set(id, cave)
    }
    return cave
  }

  private canVisitCaveOnTrip(path: CaveSystemPath, caveToVisit: Cave): boolean {
    if (this.pathIsAtAnEnd(path)) {
      return false
    }
    if (caveToVisit === this.startCave) {
      return false
    }
    if (caveToVisit.big) {
      return true
    }
    const haveAlreadyDoneALittleRevistAsATreat = path
      .filter((cave) => !cave.big)
      .some((cave, index, vistedSmallCaves) => vistedSmallCaves.indexOf(cave) !== index)

    if (!this.canRevistSmallCaveOnceAsALittleTreat || haveAlreadyDoneALittleRevistAsATreat) {
      return !path.includes(caveToVisit)
    }

    return true
  }

  public *findAllPossibleNextPaths(inputPath: CaveSystemPath): Generator<CaveSystemPath, void> {
    const currentLocation = inputPath[inputPath.length - 1]
    if (currentLocation !== this.endCave) {
      for (const linkedCave of currentLocation.links) {
        if (this.canVisitCaveOnTrip(inputPath, linkedCave)) {
          yield [...inputPath, linkedCave]
        }
      }
    }
  }

  public *walkEveryPathUntilTheEnd(inputPath: CaveSystemPath): Generator<CaveSystemPath, void> {
    for (const nextPath of this.findAllPossibleNextPaths(inputPath)) {
      if (this.pathIsAtAnEnd(nextPath)) {
        yield nextPath
      } else {
        yield* this.walkEveryPathUntilTheEnd(nextPath)
      }
    }
  }

  public *walkEveryPath(): Generator<CaveSystemPath, void> {
    yield* this.walkEveryPathUntilTheEnd([this.startCave])
  }

  private pathIsAtAnEnd(path: CaveSystemPath): boolean {
    return path[path.length - 1] === this.endCave
  }
}
