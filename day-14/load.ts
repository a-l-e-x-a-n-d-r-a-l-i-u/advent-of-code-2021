import { readFileSync } from 'fs'
import { List, Seq } from 'immutable'
import { PairInsertionRuleSet, PolymerString } from './polymer.js'

export interface PolymerInput {
  template: PolymerString
  rules: PairInsertionRuleSet
}

export function loadInput(): PolymerInput {
  const inputContents = Seq(readFileSync('input', { encoding: 'utf-8' }).split('\n')).map((line) => line.trim())

  const templateRaw = inputContents.first()
  if (!templateRaw) {
    throw new Error('could not find fist line of input')
  }
  const template = List(templateRaw) as PolymerString
  const rules = inputContents
    .skip(1)
    .filter((line) => line.length > 0)
    .map((line) => {
      const ruleParts = line.split(' -> ')
      if (ruleParts.length !== 2) {
        throw new Error('could not parse insert rule')
      }
      if (ruleParts[0].length !== 2) {
        throw new Error('parsed pair was not two characters')
      }
      return ruleParts
    })
    .fromEntrySeq()
    .toMap() as PairInsertionRuleSet

  return {
    template,
    rules,
  }
}
