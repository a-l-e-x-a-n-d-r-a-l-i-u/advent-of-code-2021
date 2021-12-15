import { Map, Record, Set, List } from 'immutable'

function reconstructPath(cameFrom: Map<Node, Node>, end: Node): List<Node> {
  const path: Node[] = [end]
  let current = end
  while (cameFrom.has(current)) {
    current = cameFrom.get(current)!
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

function findNeighbours(grid: Set<Node>, search: Node): Set<Node> {
  return grid.filter((possibleNeighbour) => {
    if (possibleNeighbour.x === search.x + 1 && possibleNeighbour.y === search.y) {
      return true
    }
    if (possibleNeighbour.x === search.x - 1 && possibleNeighbour.y === search.y) {
      return true
    }
    if (possibleNeighbour.x === search.x && possibleNeighbour.y + 1 === search.y) {
      return true
    }
    if (possibleNeighbour.x === search.x && possibleNeighbour.y - 1 === search.y) {
      return true
    }
    return false
  })
}
//based on wikipedia https://en.wikipedia.org/wiki/A*_search_algorithm

// A* finds a path from start to goal.
// h is the heuristic function. h(n) estimates the cost to reach goal from node n.
export function AStar(grid: Set<Node>, start: Node, goal: Node): List<Node> {
  // The set of discovered nodes that may need to be (re-)expanded.
  // Initially, only the start node is known.
  // This is usually implemented as a min-heap or priority queue rather than a hash-set.
  let openSet = Set([start])

  // For node n, cameFrom[n] is the node immediately preceding it on the cheapest path from start
  // to n currently known.
  let cameFrom = Map<Node, Node>()

  // For node n, gScore[n] is the cost of the cheapest path from start to n currently known.
  let gScore = Map<Node, number>()
  gScore = gScore.set(start, 0)

  // For node n, fScore[n] := gScore[n] + h(n). fScore[n] represents our current best guess as to
  // how short a path from start to finish can be if it goes through n.
  let fScore = Map<Node, number>()
  fScore = fScore.set(start, heuristic(start, goal))

  while (!openSet.isEmpty()) {
    // This operation can occur in O(1) time if openSet is a min-heap or a priority queue
    const current = openSet
      .valueSeq()
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      .map((node) => [node, fScore.get(node, Infinity)] as const)
      .minBy((n) => n[1])![0]
    if (current.equals(goal)) {
      return reconstructPath(cameFrom, current)
    }

    openSet = openSet.delete(current)
    for (const neighbor of findNeighbours(grid, current)) {
      // d(current,neighbor) is the weight of the edge from current to neighbor
      // tentative_gScore is the distance from start to the neighbor through current
      const tentativeGScore = gScore.get(current, Infinity) + neighbor.cost
      if (tentativeGScore < gScore.get(neighbor, Infinity)) {
        // This path to neighbor is better than any previous one. Record it!
        cameFrom = cameFrom.set(neighbor, current)
        gScore = gScore.set(neighbor, tentativeGScore)
        fScore = fScore.set(neighbor, tentativeGScore + heuristic(neighbor, goal))
        if (!openSet.contains(neighbor)) {
          openSet = openSet.add(neighbor)
        }
      }
    }
  }
  // Open set is empty but goal was never reached
  throw new Error('unpathable')
}
