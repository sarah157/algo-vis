import React from "react";
import { start } from "repl";
import { bfs, dfs, astar, dijkstra, bubbleSort, insertionSort, mergeSort, quickSort } from "../algorithms";
import { PathfindingAlgorithm, SortAlgorithm, Node as MyNode} from "../models";

const randomIntInRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const swap = (arr: number[], index1: number, index2: number) => {
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
};

const getSorter = (name: SortAlgorithm, array: number[]) => {
  switch(name) {
    case SortAlgorithm.bubbleSort:
      return bubbleSort(array);
    case SortAlgorithm.insertionSort:
      return insertionSort(array);
    case SortAlgorithm.mergeSort:
      return mergeSort(array);
    case SortAlgorithm.quickSort:
      return quickSort(array);
    default:
      return bubbleSort(array);
  }
};

const getPathfinder = (name: PathfindingAlgorithm, grid: MyNode[][], startPos: number[], finishPos: number[]) => {
  switch(name) {
    case PathfindingAlgorithm.bfs:
      return bfs(grid, startPos, finishPos);
    case PathfindingAlgorithm.dfs:
      return dfs(grid, startPos, finishPos);
    case PathfindingAlgorithm.astar:
      return astar(grid, startPos, finishPos)
    default:
      return dijkstra(grid, startPos, finishPos)
  }
}

const generateArray = (length: number, min: number, max: number) => {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(randomIntInRange(min, max));
  }
  return arr;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void
) => {
  const handleClick = (e: MouseEvent) => {
    if ((ref?.current && !ref.current.contains(e.target as Node))) {
      callback();
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};


const useWindowSize = () => {
  const [size, setSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  React.useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []); 
  return size;
}

export {
  randomIntInRange,
  swap,
  getSorter,
  getPathfinder,
  generateArray,
  sleep,
  capitalize,
  useClickOutside,
  useWindowSize
};
