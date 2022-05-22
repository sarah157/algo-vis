import {
  PathfindingEvent,
  PathfindingEventType as EventType,
} from "../../constants/pathfinding-visualizer";
import { isValid, getShortestPath, dRow, dCol} from "./helpers";
import { Node } from "../../constants/pathfinding-visualizer"

export default function* bfs(
  grid: Node[][],
  startPos: number[],
  finishPos: number[]
): Generator<PathfindingEvent> {
  const start = grid[startPos[0]][startPos[1]];
  const finish = grid[finishPos[0]][finishPos[1]];

  start.isVisited = true; 
  yield { type: EventType.visit, position: [start.row, start.col].join() };

  const queue = [start]; // unvisited queue

  while (queue.length > 0) {
    const currentNode: Node = queue.shift()!;

    // current node is the finish node, end loop
    if (currentNode === finish) {
      yield { type: EventType.pathFound, path: getShortestPath(finish) };
      return;
    }

    // otherwise, add adjacent nodes to queue
    for (let i = 0; i < 4; i++) {
      const adjRow = currentNode.row + dCol[i];
      const adjCol = currentNode.col + dRow[i];

      if (!isValid(grid, adjRow, adjCol)) continue;

      const adjNode: Node = grid[adjRow][adjCol];
      // set adj node as visited and set its previous node to the current node
      yield { type: EventType.visit, position: [adjRow, adjCol].join() };
      adjNode.isVisited = true;
      adjNode.prevNode = { ...currentNode };
      // add adj node to queue
      queue.push(adjNode);
    }
  }

  yield { type: EventType.noPathFound };
}


