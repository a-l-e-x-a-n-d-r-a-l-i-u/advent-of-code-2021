import { Char } from './load'

export class ChunkError extends Error {
  constructor(message: string, public readonly badChar: Char) {
    super(message)
    this.name = 'ChunkError'
  }
}

export function checkLine(line: Char[]): Char[] {
  const stack: Char[] = []
  for (const char of line) {
    if (['[', '(', '{', '<'].includes(char)) {
      stack.push(char)
    } else {
      const lastOpening = stack.pop()
      if (
        (char === ')' && lastOpening !== '(') ||
        (char === ']' && lastOpening !== '[') ||
        (char === '}' && lastOpening !== '{') ||
        (char === '>' && lastOpening !== '<')
      ) {
        //illegal
        throw new ChunkError('bad chunk', char)
      }
    }
  }
  return stack
}
