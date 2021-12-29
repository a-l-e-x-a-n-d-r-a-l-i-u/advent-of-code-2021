import Immutable, { List } from 'immutable'
import { Heap } from 'heap-js'
import { AmphipodHallway } from './AmphipodHallway'

function reconstructPath(cameFrom: Map<string, AmphipodHallway>, end: AmphipodHallway): List<AmphipodHallway> {
  const path: AmphipodHallway[] = [end]
  let current = end
  while (cameFrom.has(current.asKey)) {
    current = cameFrom.get(current.asKey)!
    path.unshift(current)
  }
  return List(path)
}

//based on wikipedia https://en.wikipedia.org/wiki/A*_search_algorithm

function getFScore(scoreMap: Map<string, { f: number; g: number }>, node: AmphipodHallway): number {
  return getScore(scoreMap, node, 'f')
}
function getGScore(scoreMap: Map<string, { f: number; g: number }>, node: AmphipodHallway): number {
  return getScore(scoreMap, node, 'g')
}
function getScore(
  scoreMap: Map<string, { f: number; g: number }>,
  node: AmphipodHallway,
  scoreType: 'f' | 'g',
): number {
  const scoreValues = scoreMap.get(node.asKey)
  return scoreValues == null ? Infinity : scoreValues[scoreType]
}
// A* finds a path from start to goal.
// h is the heuristic function. h(n) estimates the cost to reach goal from node n.
export function AStar(start: AmphipodHallway, wins = 13): (readonly [List<AmphipodHallway>, number])[] {
  // The set of discovered nodes that may need to be (re-)expanded.
  // Initially, only the start node is known.
  // This is usually implemented as a min-heap or priority queue rather than a hash-set.
  const scoreMap = new Map<string, { f: number; g: number }>()
  scoreMap.set(start.asKey, { g: 0, f: start.heuristic() })

  const openSet = new Heap<AmphipodHallway>((a, b) => getFScore(scoreMap, a) - getFScore(scoreMap, b))
  openSet.push(start)
  const openSetContents = new Set<string>([start.asKey])

  // For node n, cameFrom[n] is the node immediately preceding it on the cheapest path from start
  // to n currently known.
  const cameFrom = new Map<string, AmphipodHallway>()

  // For node n, gScore[n] is the cost of the cheapest path from start to n currently known.

  // For node n, fScore[n] := gScore[n] + h(n). fScore[n] represents our current best guess as to
  // how short a path from start to finish can be if it goes through n.

  let closest = Infinity
  const winners: (readonly [List<AmphipodHallway>, number])[] = []

  while (!openSet.isEmpty() && winners.length < wins) {
    // This operation can occur in O(1) time if openSet is a min-heap or a priority queue
    const current = openSet.pop()!
    openSetContents.delete(current.asKey)
    if (openSet.length % 100 === 0) {
      console.log('openset size', openSet.length)
    }
    if (current.hasWon()) {
      winners.push([reconstructPath(cameFrom, current), getGScore(scoreMap, current)])
      console.log('winners', winners.length)
    } else {
      for (const [neighbour, cost] of current.allPossibleMovesCached()) {
        // d(current,neighbor) is the weight of the edge from current to neighbor
        // tentative_gScore is the distance from start to the neighbor through current
        // console.log('inpecting')
        // console.log(neighbour.asHallway)
        const tentativeGScore = getGScore(scoreMap, current) + cost
        if (tentativeGScore < getGScore(scoreMap, neighbour)) {
          // This path to neighbor is better than any previous one. Record it!
          const heuristicForNeighbour = neighbour.heuristic()
          if (heuristicForNeighbour < closest) {
            console.log('closest is', heuristicForNeighbour, 'cost', tentativeGScore, 'node', neighbour.toJS())
            console.log(neighbour.asHallway)
            closest = heuristicForNeighbour
          }
          cameFrom.set(neighbour.asKey, current)
          scoreMap.set(neighbour.asKey, { g: tentativeGScore, f: tentativeGScore + heuristicForNeighbour })
          if (openSetContents.has(neighbour.asKey)) {
            openSet.remove(neighbour, Immutable.is) //remove it if we are updating it
          }
          openSet.push(neighbour)
          openSetContents.add(neighbour.asKey)
        }
      }
    }
  }
  return winners.sort((a, b) => a[1] - b[1])
}
