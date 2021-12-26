import { Record } from 'immutable'

export const PointFactory = Record(
  {
    x: 0,
    y: 0,
    z: 0,
  },
  'Point',
)
export type Point = ReturnType<typeof PointFactory>
