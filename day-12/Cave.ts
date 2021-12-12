export class Cave {
  public readonly big: boolean

  public readonly links: Cave[] = []

  constructor(public readonly id: string) {
    this.big = id.toUpperCase() === id
  }

  public addLink(cave: Cave): void {
    this.links.push(cave)
  }
}
