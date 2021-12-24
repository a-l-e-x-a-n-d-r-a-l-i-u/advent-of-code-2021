import { List } from 'immutable'
import { InfiniteImage } from './InfiniteImage'

export function zoomInAndEnhanceOnThat(enhance: List<boolean>, image: InfiniteImage): void {
  for (const { point, surrounding } of image.everyInterestingPoint()) {
    // console.log('enhancing point', point.x, ',', point.y, surrounding)
    const indexOfEnhance = parseInt(surrounding.map((enabled) => (enabled ? '1' : '0')).join(''), 2)
    const newPointValue = enhance.get(indexOfEnhance)
    if (newPointValue == null) {
      throw new Error(`could not find enhancement for ${indexOfEnhance}`)
    }
    image.setPoint(point, newPointValue)
  }
  image.currentDefault = image.currentDefault ? enhance.get(511)! : enhance.get(0)!
}
