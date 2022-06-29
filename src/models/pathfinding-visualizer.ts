export enum PathfindingAlgorithm {
  astar = "astar",
  dijkstra = "dijkstra",
  bfs = "bfs",
  dfs = "dfs"
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
  row: number;
  col: number;
  isWall: boolean;
  isVisited: boolean;
  weight: number;
  prevNode: Node | null;
  distance: number;  // 'g'
  totalDistance: number;  // 'f'
}
