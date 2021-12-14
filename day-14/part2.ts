import { Map } from 'immutable'
import { loadInput } from './load.js'
import { PolymerPair } from './polymer.js'

const input = loadInput()

const initialString = input.template
console.log('initial string', initialString.join(''))
let countOfPairs: Map<PolymerPair, number> = initialString
  .zip(initialString.skip(1))
  .map<PolymerPair>((pair) => `${pair[0]}${pair[1]}`)
  .countBy((pair) => pair)

for (let iteration = 1; iteration <= 40; iteration += 1) {
  const existingCounts = countOfPairs
  const iterationCount = Map<PolymerPair, number>().withMutations((mutableIterationCount) => {
    for (const [pair, count] of existingCounts) {
      // console.log('pair', pair, count)
      const insert = input.rules.get(pair)
      if (!insert) {
        throw new Error(`no pair rule for ${pair}`)
      }
      const newPairs = Map({
        [`${pair[0]}${insert}`]: count,
        [`${insert}${pair[1]}`]: count,
      }) as Map<PolymerPair, number>
      // console.log('inserting', newPairs.toJSON())
      mutableIterationCount.mergeWith((a, b) => a + b, newPairs)
    }
  })
  countOfPairs = iterationCount
}

const finalCount = countOfPairs
  .groupBy((_value, key) => key[0])
  .map((counts) => counts.reduce((prev, curr) => prev + curr, 0))
  .update((counts) => counts.toMap().mergeWith((a, b) => a + b, Map({ [initialString.last()!]: 1 })))

console.log('counts', finalCount.toJSON())
const max = finalCount.max() || 0
const min = finalCount.min() || 0
console.log('result', max - min)
