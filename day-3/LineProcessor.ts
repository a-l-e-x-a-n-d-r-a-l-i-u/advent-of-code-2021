export class LineProcessor {
  private currentCount: number[]

  private totalLines = 0

  constructor(protected width: number) {
    this.currentCount = Array.from({ length: width }, () => 0)
  }

  public processLine(line: string): void {
    this.totalLines += 1
    if (line.length !== this.width) {
      console.warn("processing a line that doesn't match the expected length")
      return
    }
    // eslint-disable-next-line unicorn/no-useless-spread
    for (const [index, char] of [...line].entries()) {
      if (char === '1') {
        this.currentCount[index] += 1
      }
    }
  }

  public get currentGammaAndEpsilon(): [number, number] {
    const halfwayPoint = this.totalLines / 2
    const gammaArray: number[] = []
    const epsilonArray: number[] = []
    for (const count of this.currentCount) {
      const moreOnesThanZeros = count > halfwayPoint
      gammaArray.push(moreOnesThanZeros ? 1 : 0)
      epsilonArray.push(moreOnesThanZeros ? 0 : 1)
    }
    // console.log('binary of current count', gammaArray.join(''))
    return [parseInt(gammaArray.join(''), 2), parseInt(epsilonArray.join(''), 2)]
  }
}
