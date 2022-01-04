import { List, Seq } from 'immutable'
import { RawCell } from './load.js'

interface Coordinates {
  x: number
  y: number
}

enum Cell {
  Empty = '.',
  Right = '>',
  Down = 'v',
}
export class Grid {
  /**
   * this.#grid[y][x]. 0,0 = top left.
   */
  #grid: Cell[][]

  #stepsMoved = 0

  public get stepsMoved(): number {
    return this.#stepsMoved
  }

  constructor(startGrid: List<List<RawCell>>) {
    this.#grid = Seq(startGrid)
      .map((row) =>
        Seq(row)
          .map((cell) => {
            switch (cell) {
              case '>':
                return Cell.Right
              case 'v':
                return Cell.Down
              default:
              case '.':
                return Cell.Empty
            }
          })
          .toArray(),
      )
      .toArray()
  }

  private *leftToRight(): Generator<{ cell: Cell } & Coordinates, void> {
    for (let y = 0; y < this.#grid.length; y += 1) {
      for (let x = 0; x < this.#grid[y].length; x += 1) {
        yield { cell: this.#grid[y][x], x, y }
      }
    }
  }

  private *topToBottom(): Generator<{ cell: Cell } & Coordinates, void> {
    for (let x = 0; x < this.#grid[0].length; x += 1) {
      for (let y = 0; y < this.#grid.length; y += 1) {
        yield { cell: this.#grid[y][x], x, y }
      }
    }
  }

  private getCellToTheRightOf(coords: Coordinates): Coordinates {
    return {
      x: (coords.x + 1) % this.#grid[0].length,
      y: coords.y,
    }
  }

  private getCellToTheBottomOf(coords: Coordinates): Coordinates {
    return {
      x: coords.x,
      y: (coords.y + 1) % this.#grid.length,
    }
  }

  private getCellAt(coords: Coordinates): Cell {
    return this.#grid[coords.y][coords.x]
  }

  private setCellAt(coords: Coordinates, cell: Cell): void {
    this.#grid[coords.y][coords.x] = cell
  }

  public calculateStep(): number {
    const rightChanges: { startCell: Coordinates; endCell: Coordinates }[] = []
    for (const cell of this.leftToRight()) {
      if (cell.cell === Cell.Right) {
        const cellToMoveInto = this.getCellToTheRightOf(cell)
        if (this.getCellAt(cellToMoveInto) === Cell.Empty) {
          rightChanges.push({ startCell: cell, endCell: cellToMoveInto })
        }
      }
    }
    for (const change of rightChanges) {
      this.setCellAt(change.endCell, Cell.Right)
      this.setCellAt(change.startCell, Cell.Empty)
    }
    const downChanges: { startCell: Coordinates; endCell: Coordinates }[] = []
    for (const cell of this.topToBottom()) {
      if (cell.cell === Cell.Down) {
        const cellToMoveInto = this.getCellToTheBottomOf(cell)
        if (this.getCellAt(cellToMoveInto) === Cell.Empty) {
          downChanges.push({ startCell: cell, endCell: cellToMoveInto })
        }
      }
    }
    for (const change of downChanges) {
      this.setCellAt(change.endCell, Cell.Down)
      this.setCellAt(change.startCell, Cell.Empty)
    }

    this.#stepsMoved += 1
    return rightChanges.length + downChanges.length
  }

  public calculateStepsUntilStable(): number {
    let changes = Number.POSITIVE_INFINITY
    while (changes > 0) {
      changes = this.calculateStep()
    }
    return this.stepsMoved
  }

  public get asString(): string {
    return Seq(this.#grid)
      .map((line) => line.join(''))
      .join('\n')
  }
}
