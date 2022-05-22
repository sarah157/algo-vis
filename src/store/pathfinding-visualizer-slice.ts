import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  ThunkDispatch,
  AnyAction,
} from "@reduxjs/toolkit";
import { RootState } from ".";
import bfs from "../algorithms/pathfinding/bfs";
import {
  PathfindingEvent,
  PathfindingEventType,
} from "../constants/pathfinding-visualizer";
import { sleep, swap } from "../helpers";
import {
  Node,
  PathfindingAlgorithm,
} from "../constants/pathfinding-visualizer";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

interface PathfindingVisualizerState {
  gridRows: number;
  gridCols: number;
  algorithm: PathfindingAlgorithm;
  speed: number;
  isSearching: boolean;
  isFound: boolean;
  start: string;
  end: string;
  walls: string[];
  visited: string[];
  path: string[];
}

const initialState: PathfindingVisualizerState = {
  gridRows: 25,
  gridCols: 50,
  algorithm: PathfindingAlgorithm.bfs,
  speed: 1,
  isSearching: false,
  isFound: false,
  walls: [],
  visited: [],
  path: [],
  start: [START_NODE_ROW, START_NODE_COL].join(),
  end: [FINISH_NODE_ROW, FINISH_NODE_COL].join(),
};

const pathfindingVisualizerSlice = createSlice({
  name: "pathfindingVisualize",
  initialState: initialState,
  reducers: {
    reset(state) {
      state.isFound = false;
      state.isSearching = false;
      state.walls = [];
      state.path = [];
      state.visited = [];
    },
    clearVisitedAndPath(state) {
      state.path = [];
      state.visited = [];
    },
    clearWalls(state) {
      state.walls = [];
    },
    setIsSearching(state, action) {
      state.isSearching = action.payload;
    },
    addWall(state, action) {
      const pos = action.payload;
      if (pos === state.start || pos === state.end) return;
      state.walls.push(pos);
    },
    removeWall(state, action) {
      const pos = action.payload;
      if (pos === state.start || pos === state.end) return;
      state.walls = state.walls.filter(position => position != pos)
    },
    setSpeed(state, action) {
      state.speed = action.payload;
    },
    addVisited(state, action) {
      const pos = action.payload;
      if (pos === state.start || pos === state.end) return;
      state.visited.push(pos);
    },
    setAlgorithm(state, action) {
      state.algorithm = action.payload;
    },
    setIsFound(state, action) {
      state.isFound = action.payload;
      if (state.isFound) {
        state.isSearching = false;
      }
    },
    addPath(state, action) {
      const pos = action.payload;
      if (pos === state.start || pos === state.end) return;
      state.path.push(pos);
    },
  },
});
const getNumberPos = (strPos: string) =>
  strPos.split(",").map((pos) => parseInt(pos));
export const startSearching = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("startSearching", async (_, { dispatch, getState }) => {
  dispatch(setIsSearching(true));
  let pv: PathfindingVisualizerState = getState().pathfindingVisualizer;
  const gen = bfs(
    generateGrid(pv),
    getNumberPos(pv.start),
    getNumberPos(pv.end)
  );

  let event: PathfindingEvent = gen.next().value;
  while (event && pv.isSearching) {
    await dispatchEvent(event, pv.speed, dispatch);
    event = gen.next().value;
    pv = getState().pathfindingVisualizer;
  }

  if (!event) dispatch(setIsFound(true)); // otherwise pv.isSearching = false; user clicked stop
});

async function dispatchEvent(
  event: PathfindingEvent,
  speed: number,
  dispatch: ThunkDispatch<RootState, unknown, AnyAction>
) {
  const { visit, pathFound, noPathFound } = PathfindingEventType;

  switch (event.type) {
    case visit:
      dispatch(addVisited(event.position));
      break;

    case pathFound:
      for (let pos of event.path!) {
        dispatch(addPath(pos));
        await sleep(speed);
      }
      break;
    case noPathFound:
      console.log("no PATHFOUND", event);
      break;
  }
  await sleep(speed);
}

const _sleep = async (speed: number) => {
  const delay: number = 100 - speed + 1
  await sleep(delay ** 3 / 100);
}

function generateGrid(state: any) {
  const grid = [];
  for (let r = 0; r < state.gridRows; r++) {
    const row = [];
    for (let c = 0; c < state.gridCols; c++) {
      row.push(createNode(c, r, state));
    }
    grid.push(row);
  }
  return grid;
}

function createNode(col: number, row: number, state: any): Node {
  return {
    col,
    row,
    distance: Infinity,
    isVisited: false,
    isWall: state.walls.includes([row, col].join()),
    prevNode: null,
  };
}

export const {
  reset,
  clearVisitedAndPath,
  clearWalls,
  setIsSearching,
  addWall,
  setSpeed,
  removeWall,
  addVisited,
  setAlgorithm,
  setIsFound,
  addPath,
} = pathfindingVisualizerSlice.actions;

export default pathfindingVisualizerSlice;
