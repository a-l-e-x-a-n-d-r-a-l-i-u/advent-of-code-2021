export class LanternfishPopulation {
  currentPopulation: number[]

  constructor(initialPopulation: number[]) {
    this.currentPopulation = Array.from<number>({ length: 9 }).fill(0)
    for (const laternfish of initialPopulation) {
      this.currentPopulation[laternfish] += 1
    }
  }

  public tickOneDay(): void {
    const zeroDayFish = this.currentPopulation.shift()
    if (zeroDayFish == null) {
      throw new Error("can't tick an empty population")
    }
    this.currentPopulation[6] += zeroDayFish // these fish will go back to 6
    this.currentPopulation.push(zeroDayFish) // new fish are born on day 8
  }

  public get totalPopulation(): number {
    return this.currentPopulation.reduce((prev, curr) => prev + curr, 0)
  }

  public get bucketsAsString(): string {
    return this.currentPopulation.join(',')
  }
}
