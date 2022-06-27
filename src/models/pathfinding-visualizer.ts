export enum PathfindingAlgorithm {
  bfs = "bfs",
  dfs = "dfs",
  astar = "astar",
  dijkstra = "dijkstra"
}

export enum PathfindingEventType {
  visit,
  pathFound,
  noPathFound,
}

export interface PathfindingEvent {
  type: PathfindingEventType;
  position?: string;
  path?: string[];
}

export interface Node {
  distance: number;
  row: number;
  col: number;
  isWall: boolean;
  isVisited: boolean;
  prevNode: Node | null;
}
