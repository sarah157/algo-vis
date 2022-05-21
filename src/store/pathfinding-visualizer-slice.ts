import { NumberLiteralTypeAnnotation } from "@babel/types";
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  ThunkDispatch,
  AnyAction,
} from "@reduxjs/toolkit";
import { sleep, swap } from "../helpers";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;
export enum NodeType {
  unvisted,
  visited,
  path,
  wall,
  start,
  end,
}

export interface Node {
  distance: number;
  previousNode?: Node | null;
  row: number;
  col: number;
  type: NodeType;
}

interface PathfindingVisualizerState {
  grid: Node[][];
  isFinding: boolean;
  isFound: boolean;
}

const initialState: PathfindingVisualizerState = {
  grid: getInitialGrid(),
  isFinding: false,
  isFound: false,
};

const pathfindingVisualizerSlice = createSlice({
  name: "pathfindingVisualize",
  initialState: initialState,
  reducers: {
    startFinding(state) {
      state.isFinding = true;
    },
    setWall(state, action) {
      const [i, j] = action.payload;
      if ([NodeType.start, NodeType.end].includes(state.grid[i][j].type))
        return;
      state.grid[i][j].type = NodeType.wall;
    },
  },
});

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
      ? NodeType.end
      : NodeType.unvisted;
  return {
    col,
    row,
    distance: Infinity,
    type: type,
    previousNode: null,
  };
}

export const { startFinding, setWall } = pathfindingVisualizerSlice.actions;

export default pathfindingVisualizerSlice;
