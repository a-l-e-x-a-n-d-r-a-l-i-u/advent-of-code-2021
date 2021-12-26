import { List, Seq } from 'immutable'
import boxIntersect from 'box-intersect'
import { CuboidStep } from './load.js'

type Box = [number, number, number, number, number, number]

function cuboidToBox(cuboid: CuboidStep): Box {
  return [cuboid.minimum.x, cuboid.minimum.y, cuboid.minimum.z, cuboid.maximum.x, cuboid.maximum.y, cuboid.maximum.z]
}

function reboundBoxToOverlap(boxA: Box, boxB: Box): Box {
  return [
    Math.max(boxA[0], boxB[0]),
    Math.max(boxA[1], boxB[1]),
    Math.max(boxA[2], boxB[2]),
    Math.min(boxA[3], boxB[3]),
    Math.min(boxA[4], boxB[4]),
    Math.min(boxA[5], boxB[5]),
  ]
}
function boxSize(box: Box): number {
  return (box[3] - box[0] + 1) * (box[4] - box[1] + 1) * (box[5] - box[2] + 1)
}
function countTotalArea(boxes: readonly Box[]): number {
  const boxSupply = [...boxes]
  let totalSize = 0
  while (boxSupply.length > 0) {
    const boxToSize = boxSupply.pop()!
    const overlappingBoxes = reboundBoxesToOverlapping(boxToSize, boxSupply)
    totalSize += boxSize(boxToSize)
    totalSize -= countTotalArea(overlappingBoxes)
  }
  return totalSize
}
function reboundBoxesToOverlapping(coolBox: Box, lameBoxes: Box[]): Box[] {
  return boxIntersect([coolBox], lameBoxes).map(([_, index]) => reboundBoxToOverlap(coolBox, lameBoxes[index]))
}
export function processAllCuboids(cuboidOperations: List<CuboidStep>): number {
  let totalOn = 0
  const calculatedCuboids: Box[] = []
  for (const step of cuboidOperations.toSeq().reverse()) {
    console.log('calculating step', step.operation, step.minimum.toJS(), step.maximum.toJS())
    const box = cuboidToBox(step)
    if (step.operation === 'on') {
      const intersections = reboundBoxesToOverlapping(box, calculatedCuboids)
      const sizeOfUnintersected = boxSize(box) - countTotalArea(intersections)
      console.log('adding', sizeOfUnintersected)
      totalOn += sizeOfUnintersected
    }
    calculatedCuboids.push(box)
  }
  return totalOn
}
