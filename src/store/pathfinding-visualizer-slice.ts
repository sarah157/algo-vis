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
import { CommonSettingsState } from "./common-settings-slice";
import { speedToDelay } from "../constants";


const ROWS = 30;
const COLS = 40

interface PathfindingVisualizerState {
  gridRows: number;
  gridCols: number;
  algorithm: PathfindingAlgorithm;
  isSearching: boolean;
  isFound: boolean;
  start: string;
  end: string;
  walls: string[];
  weights: string[];
  visited: string[];
  path: string[];
}

const initialState: PathfindingVisualizerState = {
  gridRows: ROWS,
  gridCols: COLS,
  algorithm: PathfindingAlgorithm.bfs,
  isSearching: false,
  isFound: false,
  walls: [],
  weights: [],
  visited: [],
  path: [],
  start: [Math.floor(ROWS/2), Math.floor(COLS/6)].join(),
  end: [Math.floor(ROWS/2), Math.floor(COLS - COLS/6)].join(),
};

const pathfindingVisualizerSlice = createSlice({
  name: "pathfindingVisualize",
  initialState: initialState,
  reducers: {
    reset(state) {
      state.isFound = false;
      state.isSearching = false;
      state.walls = [];
      state.weights = [];
      state.path = [];
      state.visited = [];
    },
    clearVisitedAndPath(state) {
      state.path = [];
      state.visited = [];
    },
    clearWallsAndWeights(state) {
      state.walls = [];
      state.weights = [];
    },
    setIsSearching(state, action) {
      state.isSearching = action.payload;
    },
    addWall(state, action) {
      const pos = action.payload;
      if (pos === state.start || pos === state.end) return;
      state.walls.push(pos);
    },
    addWeight(state, action) {
      const pos = action.payload;
      if (pos === state.start || pos === state.end) return;
      state.weights.push(pos);
    },
    removeWall(state, action) {
      const pos = action.payload;
      if (pos === state.start || pos === state.end) return;
      state.walls = state.walls.filter(position => position != pos)
    },
    removeWeight(state, action) {
      const pos = action.payload;
      if (pos === state.start || pos === state.end) return;
      state.weights = state.weights.filter(position => position != pos)
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
  let cs: CommonSettingsState = getState().commonSettings;
  const gen = bfs(
    generateGrid(pv),
    getNumberPos(pv.start),
    getNumberPos(pv.end)
  );

  let event: PathfindingEvent = gen.next().value;
  while (event && pv.isSearching) {
    await dispatchEvent(event, speedToDelay[cs.speed], dispatch);
    event = gen.next().value;
    pv = getState().pathfindingVisualizer;
    cs = getState().commonSettings;
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
  clearWallsAndWeights,
  setIsSearching,
  addWall,
  addWeight,
  removeWeight,
  removeWall,
  addVisited,
  setAlgorithm,
  setIsFound,
  addPath,
} = pathfindingVisualizerSlice.actions;

export default pathfindingVisualizerSlice;
