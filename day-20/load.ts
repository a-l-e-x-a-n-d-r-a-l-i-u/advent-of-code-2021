import { readFileSync } from 'fs'
import { Seq, List } from 'immutable'

export interface EnhanceableImage {
  enhance: List<boolean>
  image: List<List<boolean>>
}
function imageStringToBooleanArray(input: string): List<boolean> {
  return List([...input].map((char) => char === '#'))
}
export function loadInput(file = 'input'): EnhanceableImage {
  const input = Seq(readFileSync(file, { encoding: 'utf-8' }).split('\n\n'))
    .map((section) => section.trim())
    .filter((section) => section.length > 0)
  const enhanceString = input.first()
  if (!enhanceString) {
    throw new Error('could not parse out enhancement algorithm')
  }
  const enhance = imageStringToBooleanArray(enhanceString)
  if (enhance.size !== 512) {
    throw new Error('invalid enhance string size')
  }
  const imageAsString = input.last()
  if (!imageAsString) {
    throw new Error('could not parse out image')
  }
  const image = Seq(imageAsString.split('\n'))
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => imageStringToBooleanArray(line))
    .toList()
  return {
    enhance,
    image,
  }
}
