import { NumberLiteralTypeAnnotation } from "@babel/types";
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  ThunkDispatch,
  AnyAction,
} from "@reduxjs/toolkit";
import { RootState } from ".";
import bfs from "../algorithms/pathfinding/bfs";
import { sleep, swap } from "../helpers";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;
export enum PathfindingAlgorithm {
bfs = "bfs"
}
export enum NodeType {
  unvisited,
  visited,
  wall,
  start,
  finish,
}

export interface Node {
  distance: number;
  row: number;
  col: number;
  type: NodeType;
}

interface PathfindingVisualizerState {
  grid: Node[][];
  algorithm: PathfindingAlgorithm;
  speed: number;
  isSearching: boolean;
  isFound: boolean;
}


const initialState: PathfindingVisualizerState = {
  grid: getInitialGrid(),
  algorithm: PathfindingAlgorithm.bfs,
  speed: 1,
  isSearching: false,
  isFound: false,
};

const pathfindingVisualizerSlice = createSlice({
  name: "pathfindingVisualize",
  initialState: initialState,
  reducers: {
    reset(state) {
      state.isFound = false;
      state.isSearching = false;
      state.grid = getInitialGrid();
    },
    setIsSearching(state, action) {
      state.isSearching = action.payload;
    },
    setWall(state, action) {
      const [i, j] = action.payload;
      if ([NodeType.start, NodeType.finish].includes(state.grid[i][j].type))
        return;
      state.grid[i][j].type = NodeType.wall;
    },
    setVisited(state, action) {
      const [i, j] = action.payload;
      if ([NodeType.start, NodeType.finish].includes(state.grid[i][j].type))
        return;
      state.grid[i][j].type = NodeType.visited;
    },
    setAlgorithm(state, action) {
      state.algorithm = action.payload;
    },
    setIsFound(state, action) {
      state.isFound = action.payload;
    },
  },
});

export const startSearching = createAsyncThunk<void, void, { state: RootState }>(
  "startSearching",
  async (_, { dispatch, getState }) => {
    dispatch(setIsSearching(true));
    let pv: PathfindingVisualizerState = getState().pathfindingVisualizer;
    const gen: Generator<number[]> = bfs(pv.grid, pv.grid[START_NODE_ROW][START_NODE_COL], pv.grid[FINISH_NODE_ROW][FINISH_NODE_COL])

    let visited: number[] = gen.next().value;
    while (visited) {
      console.log(visited)
      // await dispatchEvent(event, pv.speed, dispatch);
      dispatch(setVisited(visited))
      await sleep(10);
      visited = gen.next().value;
      pv = getState().pathfindingVisualizer;
    }

    
console.log("sdf")
    // if (!event) dispatch(setIsSorted(true)); // else loop ended because user clicked stop
    // dispatch(resetIndices());
  })

function getInitialGrid() {
  const grid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
}

function createNode(col: number, row: number): Node {
  const type: NodeType =
    row === START_NODE_ROW && col === START_NODE_COL
      ? NodeType.start
      : row === FINISH_NODE_ROW && col === FINISH_NODE_COL
      ? NodeType.finish
      : NodeType.unvisited;
  return {
    col,
    row,
    distance: Infinity,
    type: type,
  };
}

export const { reset, setIsSearching, setWall, setVisited, setAlgorithm, setIsFound } = pathfindingVisualizerSlice.actions;

export default pathfindingVisualizerSlice;
