import {
    PathfindingEvent,
    PathfindingEventType as EventType,
  } from "../../models/pathfinding-visualizer";
  import { isValid, getShortestPath, dRow, dCol} from "./helpers";
  import { Node } from "../../models/pathfinding-visualizer"
  
export default function* dijkstra(
    grid: Node[][],
    startPos: number[],
    finishPos: number[]
  ): Generator<PathfindingEvent> {
    const start = grid[startPos[0]][startPos[1]];
    const finish = grid[finishPos[0]][finishPos[1]];
  
    start.distance = 0; 
    start.isVisited = true;

    yield { type: EventType.visit, position: [start.row, start.col].join() };
  
    const queue = []
  }