import { CaveSystem } from './CaveSystem.js'
import { loadInput } from './load.js'

const inputLinks = loadInput()

const caveSystem = new CaveSystem(inputLinks, true)

let count = 0
for (const path of caveSystem.walkEveryPath()) {
  //console.log(path.map((cave) => cave.id).join('-'))
  count += 1
}

console.log('total count', count)
