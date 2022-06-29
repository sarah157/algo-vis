import {
    PathfindingEvent,
    PathfindingEventType as EventType,
  } from "../../models/pathfinding-visualizer";
  import { Node } from "../../models/pathfinding-visualizer"
import { getShortestPath, dCol, dRow, isValid } from "./helpers";
  
  export default function* dijkstra(
    grid: Node[][],
    startPos: number[],
    finishPos: number[]
  ): Generator<PathfindingEvent> {
    const start = grid[startPos[0]][startPos[1]];
    const finish = grid[finishPos[0]][finishPos[1]];
  
    start.distance = 0;
    start.totalDistance = 0;
    start.isVisited = true;
  
    yield { type: EventType.visit, position: [start.row, start.col].join() };
  
    let openList = [start]; // priority queue
  
    while (openList.length > 0) {
      
      // pop the position of node which has the minimum totalDistance (f) value.            
      openList.sort((a, b) => a.totalDistance! - b.totalDistance!);
      const currentNode = openList.shift()!;
  
      if (currentNode === finish) {
        yield { type: EventType.pathFound, path: getShortestPath(finish) };
        return;
      }
  
      currentNode.isVisited = true;
      yield {
        type: EventType.visit,
        position: [currentNode.row, currentNode.col].join(),
      };
  
      for (let i = 0; i < 4; i++) {
        const adjRow = currentNode.row + dCol[i];
        const adjCol = currentNode.col + dRow[i];
  
        if (!isValid(grid, adjRow, adjCol)) continue;
  
        const adjNode: Node = grid[adjRow][adjCol];
        const tempDistance = currentNode.distance + currentNode.weight;
  
        if (tempDistance < adjNode.distance!) {
          adjNode.prevNode = { ...currentNode };
          adjNode.distance = tempDistance;
          adjNode.totalDistance = adjNode.distance 
  
          if (!openList.includes(adjNode)) {
            openList.push(adjNode);
          } else {
              // update adjNode position in openList priorty queue
          }
        }
      }
    }
  
    yield { type: EventType.noPathFound };
  }
  