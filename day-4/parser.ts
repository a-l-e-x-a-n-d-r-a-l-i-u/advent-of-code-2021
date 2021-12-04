import { readFileSync } from 'fs'
import { BingoBoard } from './BingoBoard.js'

export function loadInput(): [number[], BingoBoard[]] {
  const inputContents = readFileSync('input', { encoding: 'utf-8' })

  const firstLineBreak = inputContents.indexOf('\n')
  if (firstLineBreak < 0) {
    throw new Error('could not parse input')
  }
  const drawnNumbers = inputContents
    .slice(0, firstLineBreak)
    .split(',')
    .map((draw) => Number(draw.trim()))

  const boardsInput = inputContents
    .slice(firstLineBreak)
    .split('\n\n')
    .map((rawBoard) => rawBoard.trim())
    .filter((rawBoard) => rawBoard.length > 0)

  const allBoards = boardsInput.map(
    (rawBoard) => new BingoBoard(rawBoard.split('\n').map((rawRow) => rawRow.split(/ +/g).map(Number))),
  )
  return [drawnNumbers, allBoards]
}
