import { loadInput } from './load.js'

const input = loadInput()

class CrabArmy {
  constructor(private army: number[]) {}

  public naiveFuelToMoveToPosition(position: number): number {
    return this.army.reduce((prev, curr, i) => {
      const fuelForThisCrab = Math.abs(position - curr)
      // console.log('crab', i, 'is using', fuelForThisCrab, 'fuel')
      return prev + fuelForThisCrab
    }, 0)
  }

  public realFuelToMoveToPosition(position: number): number {
    return this.army.reduce((prev, curr, i) => {
      const spaceToMove = Math.abs(position - curr)
      const fuelForThisCrab = (spaceToMove * (spaceToMove + 1)) / 2
      // console.log('crab', i, 'is using', fuelForThisCrab, 'fuel')
      return prev + fuelForThisCrab
    }, 0)
  }

  public get minimumPosition(): number {
    return Math.min(...this.army)
  }

  public get maximumPosition(): number {
    return Math.max(...this.army)
  }

  public get averagePosition(): number {
    return this.army.reduce((prev, curr) => prev + curr, 0) / this.army.length
  }
}

const army = new CrabArmy(input)

//lets just brute force for now
let minimumFuelUse = Number.POSITIVE_INFINITY
let bestPosition: number | null = null
for (let testPosition = army.minimumPosition; testPosition <= army.maximumPosition; testPosition += 1) {
  const fuelUse = army.realFuelToMoveToPosition(testPosition)
  if (fuelUse < minimumFuelUse) {
    minimumFuelUse = fuelUse
    bestPosition = testPosition
  }
}

console.log('fuel use', minimumFuelUse)
console.log('best position', bestPosition)
