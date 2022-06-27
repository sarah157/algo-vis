import {
  PathfindingEvent,
  PathfindingEventType as EventType,
} from "../../models/pathfinding-visualizer";
import { isValid, getShortestPath, dRow, dCol } from "./helpers";
import { Node } from "../../models/pathfinding-visualizer";

export default function* dfs(
  grid: Node[][],
  startPos: number[],
  finishPos: number[]
): Generator<PathfindingEvent> {
  const start = grid[startPos[0]][startPos[1]];
  const finish = grid[finishPos[0]][finishPos[1]];

  const stack = [start]; // unvisited queue

  while (stack.length > 0) {
    const currNode: Node = stack.pop()!;
    // current node is the finish node, end loop
    if (currNode === finish) {
      yield { type: EventType.pathFound, path: getShortestPath(finish) };
      return;
    }

    currNode.isVisited = true;
    yield { type: EventType.visit, position: [currNode.row, currNode.col].join() };

    // add valid adjacent nodes to stack
    for (let i = 0; i < 4; i++) {
      const adjRow = currNode.row + dCol[i];
      const adjCol = currNode.col + dRow[i];

      if (!isValid(grid, adjRow, adjCol)) continue;

      const adjNode: Node = grid[adjRow][adjCol];
      adjNode.prevNode = { ...currNode };
      stack.push(adjNode);
    }
  }

  yield { type: EventType.noPathFound };
}
