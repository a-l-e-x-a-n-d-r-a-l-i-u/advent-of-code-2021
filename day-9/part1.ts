import { loadInput } from './load.js'

// Gradient descent is flaws because it doesn't consider local vs global minima

/*

Algorithm to Find Local Minima:

1) Iterate over each element in the grid.
2) Compare it with its adjacent neighbours (up, down, left, right).
3) If it's smaller than all its neighbours, it's a local minimum.

*/

const input = loadInput()

