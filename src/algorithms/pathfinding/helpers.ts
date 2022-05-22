import { Node } from "../../constants/pathfinding-visualizer";

export const dRow = [0, 0, -1, 1];
export const dCol = [-1, 1, 0, 0];

export const isValid = (grid: Node[][], row: number, col: number) => {
  if (row < 0 || row >= grid.length || col < 0 || col >= grid[0].length)
    return false;

  const node: Node = grid[row][col];
  if (node.isWall || node.isVisited) return false;

  return true;
};

export const getShortestPath = (finish: Node) => {
  const path: string[] = [];
  let currentNode = finish;
  while (currentNode !== null) {
    path.unshift([currentNode.row, currentNode.col].join());
    currentNode = currentNode.prevNode!;
  }
  return path;
};
