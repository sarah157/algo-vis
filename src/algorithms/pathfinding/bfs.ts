import {
  ConnectingAirportsOutlined,
  ConstructionOutlined,
} from "@mui/icons-material";
import {
  PathfindingEvent,
  PathfindingEventType,
} from "../../constants/pathfinding-visualizer";
import { Node, NodeType } from "../../store/pathfinding-visualizer-slice";

function* bfs(
  grid: Node[][],
  start: Node,
  finish: Node
): Generator<PathfindingEvent> {
  const unvisited = [start];
  let visited: boolean[][] = [];
  for (let i = 0; i < grid.length; i++) {
    visited[i] = Array(grid[0].length).fill(false);
  }
  let path: number[][] = [];
  while (unvisited.length > 0) {
    let node: Node = unvisited.shift()!;
    if (node === finish) {
      yield { type: PathfindingEventType.pathFound, path };
      return;
    }
    if (node.type === NodeType.wall || visited[node.row][node.col]) continue;

    yield { type: PathfindingEventType.visit, position: [node.row, node.col] };

    visited[node.row][node.col] = true;

    const dRow = [0, 0, -1, 1];
    const dCol = [-1, 1, 0, 0];

    for (let i = 0; i < 4; i++) {
      const nextRow = node.row + dCol[i];
      const nextCol = node.col + dRow[i];

      if (
        nextRow < 0 ||
        nextRow >= grid.length ||
        nextCol < 0 ||
        nextCol >= grid[0].length
      )
        continue;

      unvisited.push(grid[nextRow][nextCol]);
      path.push([nextRow, nextCol]);
    }
  }
  yield { type: PathfindingEventType.noPathFound };
}

export default bfs;
