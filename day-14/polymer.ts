import { Map, Seq } from 'immutable'

export type PolymerChar =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'
export type PolymerPair = `${PolymerChar}${PolymerChar}`
export type PolymerString = Seq.Indexed<PolymerChar>

export type PairInsertionRuleSet = Map<PolymerPair, PolymerChar>

export function applyRules(input: PolymerString, rules: PairInsertionRuleSet): PolymerString {
  const eachPairInInput = input.zip(input.skip(1))
  const eachInsertToInput = eachPairInInput.map((inputPair) => rules.get(`${inputPair[0]}${inputPair[1]}`))
  return (input as Seq.Indexed<PolymerChar | undefined>)
    .zipAll(eachInsertToInput)
    .flatMap((pair) => pair.filter((char): char is PolymerChar => char != null))
}
