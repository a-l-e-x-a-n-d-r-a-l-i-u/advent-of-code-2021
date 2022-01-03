import { List } from 'immutable'
import { Alu } from './Alu.js'
import { RawInstruction } from './load.js'

export class ForkingAlu extends Alu {
  constructor(
    instructions: List<RawInstruction> | Alu,
    w = 0,
    z = 0,
    public instructionCursor = 0,
    public smallestInput = 0,
    public largestInput = 0,
    public rowId = -1,
  ) {
    super(instructions)
    this.w = w
    this.z = z
  }

  runUntilFork(): ForkingAlu[] | null {
    let nonForkingInstruction = true
    while (nonForkingInstruction) {
      const instruction = this.instructions.get(this.instructionCursor)
      if (instruction?.name === 'inp' || !instruction) {
        nonForkingInstruction = false
      } else {
        instruction.bind(this)()
      }
      this.instructionCursor += 1
    }
    const forkingInstruction = this.instructions.get(this.instructionCursor - 1)

    return forkingInstruction ? [1, 2, 3, 4, 5, 6, 7, 8, 9].map((input) => this.fork(input, forkingInstruction)) : null
  }

  public fork(input: number, forkingInstruction: () => void): ForkingAlu {
    const nextSmallestInput = this.smallestInput * 10 + input
    const nextLargestInput = this.largestInput * 10 + input
    const clone = new ForkingAlu(this, this.w, this.z, this.instructionCursor, nextSmallestInput, nextLargestInput)
    forkingInstruction.bind(clone)()
    return clone
  }

  public get finishedCalculating(): boolean {
    return this.instructionCursor >= this.instructions.size
  }

  protected getNextInput(): number {
    const smallestInput = this.smallestInput % 10
    const largestInput = this.largestInput % 10
    if (smallestInput !== largestInput) {
      throw new Error("you didn't think right")
    }
    return smallestInput
  }
}
