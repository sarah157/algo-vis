import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  ThunkDispatch,
  AnyAction,
} from "@reduxjs/toolkit";
import { RootState } from ".";
import {
  PathfindingEvent,
  PathfindingEventType,
} from "../models/pathfinding-visualizer";
import { sleep, getPathfinder } from "../helpers";
import { Node, PathfindingAlgorithm } from "../models/pathfinding-visualizer";
import { CommonSettingsState } from "./common-settings-slice";
import { speedToDelay } from "../models";

const ROWS = 30;
const COLS = 55;

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
  algorithm: PathfindingAlgorithm.astar,
  isSearching: false,
  isFound: false,
  walls: [],
  weights: [],
  visited: [],
  path: [],
  start: [Math.floor(ROWS / 2), Math.floor(COLS / 6)].join(),
  end: [Math.floor(ROWS / 2), Math.floor(COLS - COLS / 6)].join(),
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
      state.isFound = false;
    },
    clearWallsAndWeights(state) {
      state.walls = [];
      state.weights = [];
    },
    setIsSearching(state, action: PayloadAction<boolean>) {
      state.isSearching = action.payload;
    },
    addWall(state, action: PayloadAction<string>) {
      const pos = action.payload;
      if (pos === state.start || pos === state.end) return;
      state.walls.push(pos);
      if (state.weights.includes(pos)) {
        state.weights = state.weights.filter((position) => position !== pos);
     }
    },
    addWeight(state, action: PayloadAction<string>) {
      const pos = action.payload;
      if (pos === state.start || pos === state.end) return;
      state.weights.push(pos);
      if (state.walls.includes(pos)) {
         state.walls = state.walls.filter((position) => position !== pos);
      }
    },
    removeWall(state, action: PayloadAction<string>) {
      const pos = action.payload;
      if (pos === state.start || pos === state.end) return;
      state.walls = state.walls.filter((position) => position !== pos);
    },
    removeWeight(state, action: PayloadAction<string>) {
      const pos = action.payload;
      if (pos === state.start || pos === state.end) return;
      state.weights = state.weights.filter((position) => position !== pos);
    },
    addVisited(state, action: PayloadAction<string>) {
      const pos = action.payload;
      if (pos === state.start || pos === state.end) return;
      state.visited.push(pos);
    },
    setAlgorithm(state, action: PayloadAction<PathfindingAlgorithm>) {
      state.algorithm = action.payload;
    },
    setIsFound(state, action: PayloadAction<boolean>) {
      state.isFound = action.payload;
      if (state.isFound) {
        state.isSearching = false;
      }
    },
    addPath(state, action: PayloadAction<string>) {
      const pos = action.payload;
      if (pos === state.start || pos === state.end) return;
      state.path.push(pos);
    },
  },
});

export const startSearching = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("startSearching", async (_, { dispatch, getState }) => {
  dispatch(setIsSearching(true));
  let pv: PathfindingVisualizerState = getState().pathfindingVisualizer;
  let cs: CommonSettingsState = getState().commonSettings;
  const gen = getPathfinder(
    pv.algorithm,
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
      dispatch(addVisited(event.position!));
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

function getNumberPos(strPos: string) {
  return strPos.split(",").map((pos) => parseInt(pos));
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
    isVisited: false,
    isWall: state.walls.includes([row, col].join()),
    prevNode: null,
    distance: Infinity,
    weight: state.weights.includes([row, col].join()) ? 10 : 1,
    totalDistance: Infinity,
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
