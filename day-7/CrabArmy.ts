export class CrabArmy {
  constructor(private army: number[]) {}

  public naiveFuelToMoveToPosition(position: number): number {
    return this.army.reduce((prev, curr, i) => {
      const fuelForThisCrab = Math.abs(position - curr)
      // console.log('crab', i, 'is using', fuelForThisCrab, 'fuel')
      return prev + fuelForThisCrab
    }, 0)
  }

  public realFuelToMoveToPosition(position: number): number {
    throw new Error('todo')
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
