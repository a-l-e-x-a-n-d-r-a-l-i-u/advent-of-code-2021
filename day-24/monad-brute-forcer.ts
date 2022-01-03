export function* everyPossibleMonadNumber(): Generator<number[], void> {
  let output = 99999999999999
  while (output >= 11111111111111) {
    if (output % 100000 === 0) {
      console.log('trying', output)
    }
    const outputAsArray = output.toString().split('').map(Number)
    if (outputAsArray.every((digit) => digit !== 0)) {
      yield outputAsArray
    }
    output -= 1
  }
}
