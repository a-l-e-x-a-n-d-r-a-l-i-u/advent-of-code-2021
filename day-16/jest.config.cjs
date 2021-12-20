// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultOptions = require('../jest.config.cjs')

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  displayName: 'day-16',
  ...defaultOptions,
}
