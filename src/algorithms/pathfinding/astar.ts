import {
    PathfindingEvent,
    PathfindingEventType as EventType,
  } from "../../models/pathfinding-visualizer";
  import { Node } from "../../models/pathfinding-visualizer"
import { dCol, dRow, getHeuristic, getShortestPath, isValid } from "./helpers";
  
function* astarr(
    grid: Node[][],
    startPos: number[],
    finishPos: number[]
  ): Generator<PathfindingEvent> {
    const start = grid[startPos[0]][startPos[1]];
    const finish = grid[finishPos[0]][finishPos[1]];
  
    start.totalDistance = 0; 
    start.isVisited = true;
    
    yield { type: EventType.visit, position: [start.row, start.col].join() };
    
    // let openList: Node[] = grid.reduce((flattened, row) => flattened.concat(row), [])
    let openList = [start]
let closedList: Node[] = []
    while (openList.length > 0) {
        
        const currentNode = getClosestNode(openList)

        // openList = openList.filter(node => node !== currentNode)
        currentNode.isVisited = true;
        yield { type: EventType.visit, position: [currentNode.row, currentNode.col].join() };



        if (currentNode == finish) {
            yield { type: EventType.pathFound, path: getShortestPath(finish) };
            return;
        }
    for (let i = 0; i < 4; i++) {
        const adjRow = currentNode.row + dCol[i];
        const adjCol = currentNode.col + dRow[i];
        if (!isValid(grid, adjRow, adjCol)) continue;
  
    
        const adjNode: Node = grid[adjRow][adjCol];
        const tempDistance = currentNode.distance + 1; // node.weight
        if (!openList.includes(adjNode) && !closedList.includes(adjNode)) {
       adjNode.prevNode = { ...currentNode };
          adjNode.distance = tempDistance;
          adjNode.totalDistance = adjNode.distance + getHeuristic(adjNode, finish);
          openList.push(adjNode)
        }
        else {
            if (tempDistance < adjNode.distance) {
                adjNode.prevNode = { ...currentNode };
                adjNode.distance = tempDistance;
                adjNode.totalDistance = adjNode.distance + getHeuristic(adjNode, finish);
                openList.push(adjNode)

                if (closedList.includes(adjNode)) {
                    closedList = closedList.filter(node => node !== adjNode)
                }
        }
        } 




     
      
      }

      openList = openList.filter(node => node !== currentNode)
      closedList.push(currentNode)
    }

    yield { type: EventType.noPathFound };

  }


    
export default function* astar(
    grid: Node[][],
    startPos: number[],
    finishPos: number[]
  ): Generator<PathfindingEvent> {
    const start = grid[startPos[0]][startPos[1]];
    const finish = grid[finishPos[0]][finishPos[1]];
  
    start.distance = 0; 
    start.isVisited = true;
    
    yield { type: EventType.visit, position: [start.row, start.col].join() };
    
    let unvisitedNodes: Node[] = grid.reduce((flattened, row) => flattened.concat(row), [])

    while (unvisitedNodes.length > 0) {
        
        unvisitedNodes.sort((a, b) => a.distance - b.distance)

        const currentNode = unvisitedNodes.shift()!;

        if (currentNode.distance === Infinity) {
            break;
        }


        if (currentNode == finish) {
            yield { type: EventType.pathFound, path: getShortestPath(finish) };
            return;
        }

        currentNode.isVisited = true;
    for (let i = 0; i < 4; i++) {
        const adjRow = currentNode.row + dCol[i];
        const adjCol = currentNode.col + dRow[i];
        if (!isValid(grid, adjRow, adjCol)) continue;
  
    
        const adjNode: Node = grid[adjRow][adjCol];
        const tempDistance = currentNode.distance + 1; // node.weight

                adjNode.prevNode = { ...currentNode };
                adjNode.distance = tempDistance;
                adjNode.distance = adjNode.distance + getHeuristic(adjNode, finish);

       }
        }
        



     

    yield { type: EventType.noPathFound };

  }


  const getClosestNode = (nodes: Node[]) => {
    let closestNode: Node = nodes[0]
    for (let node of nodes) {
        if (closestNode !== null && closestNode.totalDistance <= node.totalDistance) {
            closestNode = node;
        }
    }
    return closestNode;
}

