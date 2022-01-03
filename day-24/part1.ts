import { DatabaseHandler } from './database.js'
import { ForkingAlu } from './ForkingAlu.js'

const database = new DatabaseHandler(null as unknown as ForkingAlu) //cheating
console.log('largest valid input', database.getHighestValidAnswer())
