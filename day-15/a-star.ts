import { Record, Set, List, Seq } from 'immutable'
import Heap from 'heap'

function reconstructPath(cameFrom: Map<string, Node>, end: Node): List<Node> {
  const path: Node[] = [end]
  let current = end
  while (cameFrom.has(nodeKey(current))) {
    current = cameFrom.get(nodeKey(current))!
    path.unshift(current)
  }
  return List(path)
}

function heuristic(from: Node, goal: Node): number {
  const dx = Math.abs(from.x - goal.x)
  const dy = Math.abs(from.y - goal.y)
  return Math.sqrt(dx ** 2 + dy ** 2)
}

export const NodeFactory = Record({ x: -1, y: -1, cost: -1 })
export type Node = ReturnType<typeof NodeFactory>

function findNeighbours(grid: List<List<Node>>, search: Node): Set<Node> {
  const neighbours: (Node | undefined)[] = []
  if (search.y - 1 >= 0) {
    neighbours.push(grid.get(search.y - 1)?.get(search.x))
  }
  if (search.y + 1 >= 0) {
    neighbours.push(grid.get(search.y + 1)?.get(search.x))
  }
  if (search.x - 1 >= 0) {
    neighbours.push(grid.get(search.y)?.get(search.x - 1))
  }
  if (search.x + 1 >= 0) {
    neighbours.push(grid.get(search.y)?.get(search.x + 1))
  }
  return Seq(neighbours)
    .filter((node): node is Node => node != null)
    .toSet()
}
//based on wikipedia https://en.wikipedia.org/wiki/A*_search_algorithm

function nodeKey(node: Node): string {
  return `${node.x},${node.y}`
}

function getFScore(scoreMap: Map<string, { f: number; g: number }>, node: Node): number {
  return getScore(scoreMap, node, 'f')
}
function getGScore(scoreMap: Map<string, { f: number; g: number }>, node: Node): number {
  return getScore(scoreMap, node, 'g')
}
function getScore(scoreMap: Map<string, { f: number; g: number }>, node: Node, scoreType: 'f' | 'g'): number {
  const scoreValues = scoreMap.get(nodeKey(node))
  return scoreValues == null ? Infinity : scoreValues[scoreType]
}
// A* finds a path from start to goal.
// h is the heuristic function. h(n) estimates the cost to reach goal from node n.
export function AStar(grid: List<List<Node>>, start: Node, goal: Node): List<Node> {
  // The set of discovered nodes that may need to be (re-)expanded.
  // Initially, only the start node is known.
  // This is usually implemented as a min-heap or priority queue rather than a hash-set.
  const scoreMap = new Map<string, { f: number; g: number }>()
  scoreMap.set(nodeKey(start), { g: 0, f: heuristic(start, goal) })

  const openSet = new Heap<Node>((a, b) => getFScore(scoreMap, a) - getFScore(scoreMap, b))
  openSet.push(start)

  // For node n, cameFrom[n] is the node immediately preceding it on the cheapest path from start
  // to n currently known.
  const cameFrom = new Map<string, Node>()

  // For node n, gScore[n] is the cost of the cheapest path from start to n currently known.

  // For node n, fScore[n] := gScore[n] + h(n). fScore[n] represents our current best guess as to
  // how short a path from start to finish can be if it goes through n.

  let closest = Infinity

  while (!openSet.empty()) {
    // This operation can occur in O(1) time if openSet is a min-heap or a priority queue
    const current = openSet.pop()
    if (current.equals(goal)) {
      return reconstructPath(cameFrom, current)
    }

    for (const neighbour of findNeighbours(grid, current)) {
      // d(current,neighbor) is the weight of the edge from current to neighbor
      // tentative_gScore is the distance from start to the neighbor through current
      const tentativeGScore = getGScore(scoreMap, current) + neighbour.cost
      if (tentativeGScore < getGScore(scoreMap, neighbour)) {
        // This path to neighbor is better than any previous one. Record it!
        const heuristicForNeighbour = heuristic(neighbour, goal)
        if (heuristicForNeighbour < closest) {
          console.log('closest is', heuristicForNeighbour, 'node', nodeKey(neighbour))
          closest = heuristicForNeighbour
        }
        cameFrom.set(nodeKey(neighbour), current)
        scoreMap.set(nodeKey(neighbour), { g: tentativeGScore, f: tentativeGScore + heuristicForNeighbour })
        if (!openSet.toArray().includes(neighbour)) {
          openSet.push(neighbour)
        } else {
          openSet.updateItem(neighbour)
        }
      }
    }
  }
  // Open set is empty but goal was never reached
  throw new Error('unpathable')
}
