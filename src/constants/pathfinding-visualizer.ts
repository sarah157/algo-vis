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

export enum PathfindingAlgorithm {
  bfs = "bfs",
}

export interface Node {
  distance: number;
  row: number;
  col: number;
  isWall: boolean;
  isVisited: boolean;
  prevNode: Node | null;
}
