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
  row: number;
  col: number;
  isWall: boolean;
  isVisited: boolean;
  weight: number;
  prevNode: Node | null;
  distance: number;  // 'g'
  totalDistance: number;  // 'f'
}
