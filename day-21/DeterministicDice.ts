export class DeterministicDice {
  #currentPoint = 1

  #numberOfRolls = 0

  public next(): number {
    this.#numberOfRolls += 1
    const result = this.#currentPoint
    this.#currentPoint += 1
    return result
  }

  public nextThree(): number {
    return this.next() + this.next() + this.next()
  }

  public peekNext(): number {
    return this.#currentPoint
  }

  public get numberOfRolls(): number {
    return this.#numberOfRolls
  }
}
