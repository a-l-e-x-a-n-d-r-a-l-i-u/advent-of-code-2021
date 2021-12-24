import { zoomInAndEnhanceOnThat } from './enhance-infinite-image.js'
import { InfiniteImage } from './InfiniteImage.js'
import { loadInput } from './load.js'

const input = loadInput()

const image = new InfiniteImage(input.image)

for (let passes = 1; passes <= 50; passes += 1) {
  zoomInAndEnhanceOnThat(input.enhance, image)
}

image.printImage()

console.log('lit pixels', image.litPoints)
