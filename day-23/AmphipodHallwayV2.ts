import { Amphipod, AmphipodHallway, HallwayLocation } from './AmphipodHallway.js'

export class AmphipodHallwayV2 extends AmphipodHallway {
  protected targets(type: Amphipod): HallwayLocation[] {
    const base = super.targets(type)
    if (type === 'A') {
      return [...base, 19, 20]
    }
    if (type === 'B') {
      return [...base, 21, 22]
    }
    if (type === 'C') {
      return [...base, 23, 24]
    }
    if (type === 'D') {
      return [...base, 25, 26]
    }
    throw new Error('invalid room type')
  }

  protected neighbours(location: HallwayLocation): HallwayLocation[] {
    if (location === 12) {
      return [11, 19]
    }
    if (location === 19) {
      return [12, 20]
    }
    if (location === 20) {
      return [19]
    }
    if (location === 14) {
      return [13, 21]
    }
    if (location === 21) {
      return [14, 22]
    }
    if (location === 22) {
      return [21]
    }
    if (location === 16) {
      return [15, 23]
    }
    if (location === 23) {
      return [16, 24]
    }
    if (location === 24) {
      return [23]
    }
    if (location === 18) {
      return [17, 25]
    }
    if (location === 25) {
      return [18, 26]
    }
    if (location === 26) {
      return [25]
    }
    return super.neighbours(location)
  }

  protected distanceFromTo(from: HallwayLocation, to: HallwayLocation): number {
    if (from === 19) {
      return this.distanceFromTo(2, to) + 3
    }
    if (from === 20) {
      return this.distanceFromTo(2, to) + 4
    }
    if (from === 21) {
      return this.distanceFromTo(4, to) + 3
    }
    if (from === 22) {
      return this.distanceFromTo(4, to) + 4
    }
    if (from === 23) {
      return this.distanceFromTo(6, to) + 3
    }
    if (from === 24) {
      return this.distanceFromTo(6, to) + 4
    }
    if (from === 25) {
      return this.distanceFromTo(8, to) + 3
    }
    if (from === 26) {
      return this.distanceFromTo(8, to) + 4
    }
    if (to === 19) {
      return this.distanceFromTo(from, 2) + 3
    }
    if (to === 20) {
      return this.distanceFromTo(from, 2) + 4
    }
    if (to === 21) {
      return this.distanceFromTo(from, 4) + 3
    }
    if (to === 22) {
      return this.distanceFromTo(from, 4) + 4
    }
    if (to === 23) {
      return this.distanceFromTo(from, 6) + 3
    }
    if (to === 24) {
      return this.distanceFromTo(from, 6) + 4
    }
    if (to === 25) {
      return this.distanceFromTo(from, 8) + 3
    }
    if (to === 26) {
      return this.distanceFromTo(from, 8) + 4
    }
    return super.distanceFromTo(from, to)
  }

  public get asHallway(): string {
    const base = super.asHallway
    const thirdRow = [19, 21, 23, 25].map((location) => this.whatsHere(location)).join('#')
    const fourthRow = [20, 22, 24, 26].map((location) => this.whatsHere(location)).join('#')
    return `${base}\n #${thirdRow}# \n #${fourthRow}# `
  }
}
