interface BingoCell {
  label: number
  marked: boolean
}
export class BingoBoard {
  board: BingoCell[][]

  constructor(rows: number[][]) {
    this.board = rows.map((row) => row.map((label) => ({ label, marked: false })))
  }

  public markThisNumber(input: number): void {
    for (const row of this.board) {
      for (const cell of row) {
        if (cell.label === input) {
          cell.marked = true
        }
      }
    }
  }

  public get hasWon(): boolean {
    const allColumnMarked: boolean[] = Array.from({ length: this.board[0].length }, () => true)
    for (const row of this.board) {
      let allRowMarked = true
      for (const [index, cell] of row.entries()) {
        allRowMarked = allRowMarked && cell.marked
        allColumnMarked[index] = allColumnMarked[index] && cell.marked
      }
      if (allRowMarked) {
        return true
      }
    }
    return allColumnMarked.some((allMarked) => allMarked)
  }

  public get sumOfAllUnmarked(): number {
    let total = 0
    for (const row of this.board) {
      for (const cell of row) {
        if (!cell.marked) {
          total += cell.label
        }
      }
    }
    return total
  }
}
