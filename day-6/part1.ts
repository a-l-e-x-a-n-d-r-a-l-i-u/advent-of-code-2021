import { LanternfishPopulation } from './LanternfishPopulation.js'
import { loadInput } from './load.js'

const input = loadInput()

const population = new LanternfishPopulation(input)
console.log('initial population', population.totalPopulation)
console.log('population in day buckets', population.bucketsAsString)

for (let day = 1; day <= 80; day += 1) {
  population.tickOneDay()
  console.log(`population on day ${day} is ${population.totalPopulation}`)
  // console.log('population in day buckets', population.bucketsAsString)
}
