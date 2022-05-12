import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  ThunkDispatch,
  AnyAction,
} from "@reduxjs/toolkit";
import { generateArray, sleep, swap } from "../helpers";
import {
  SortEvent,
  SortAlgorithm,
  SortEventType,
  initialArrayLength,
  minArrayValue,
  maxArrayValue,
  initialSpeed,
} from "../constants";
import { RootState } from ".";

import * as sorters from "../algorithms";

interface SortingVisualizerState {
  array: number[];
  arrayLength: number;
  speed: number;
  algorithm: SortAlgorithm;
  swapIndices: number[] | undefined;
  compareIndices: number[];
  sortedIndices: number[];
  pivotIndex: number;
  isSorted: boolean;
  isSorting: boolean;
  mode: "bar" | "scatter";
}

const initialState: SortingVisualizerState = {
  array: generateArray(initialArrayLength, minArrayValue, maxArrayValue),
  arrayLength: initialArrayLength,
  speed: initialSpeed,
  algorithm: SortAlgorithm.bubbleSort,
  swapIndices: [],
  compareIndices: [],
  sortedIndices: [],
  pivotIndex: -1,
  isSorted: false,
  isSorting: false,
  mode: "bar",
};

const sortVisualizerSlice = createSlice({
  name: "sortvisualizer",
  initialState: initialState,
  reducers: {
    reset(state) {
      state.isSorted = false;
      state.sortedIndices = [];
      state.swapIndices = [];
      state.compareIndices = [];
      state.array = generateArray(
        state.arrayLength,
        minArrayValue,
        maxArrayValue
      );
    },
    changeValue(state, action: PayloadAction<number[]>) {
      const [index, value] = action.payload;
      state.array[index] = value;
    },
    setPivot(state, action) {
      state.pivotIndex = action.payload;
    },
    resetIndices(state) {
      state.swapIndices = [];
      state.compareIndices = [];
      state.pivotIndex = -1;
    },
    setMode(state, action) {
      state.mode = action.payload;
    },
    swapValues(state, action) {
      const [i, j] = action.payload;
      swap(state.array, i, j);
    },
    stopSorting(state) {
      state.isSorting = false;
    },
    addSortedIndices(state, action: PayloadAction<number[]>) {
      state.sortedIndices = [...state.sortedIndices, ...action.payload];
    },
    setIsSorting(state, action: PayloadAction<boolean>) {
      state.isSorting = action.payload;
      state.isSorted = false;
    },
    setIsSorted(state, action: PayloadAction<boolean>) {
      state.isSorted = action.payload;
      state.sortedIndices = Array.from(
        { length: state.arrayLength },
        (x, i) => i
      );
      if (state.isSorted) {
        state.isSorting = false;
      }
    },
    setArrayLength(state, action: PayloadAction<number>) {
      state.arrayLength = action.payload;
    },
    setSpeed(state, action: PayloadAction<number>) {
      state.speed = action.payload;
    },
    setAlgorithm(state, action: PayloadAction<SortAlgorithm>) {
      state.algorithm = action.payload;
    },
    setSwapIndices(state, action: PayloadAction<number[]>) {
      state.swapIndices = action.payload;
    },
    setCompareIndices(state, action: PayloadAction<number[]>) {
      state.compareIndices = action.payload;
    },
  },
});

export const startSorting = createAsyncThunk<void, void, { state: RootState }>(
  "startSorting",
  async (_, { dispatch, getState }) => {
    dispatch(setIsSorting(true));
    let sv: SortingVisualizerState = getState().sortingVisualizer;
    const gen: Generator<SortEvent> = sorters[sv.algorithm]([...sv.array]);
    let event: SortEvent = gen.next().value;

    while (event && sv.isSorting) {
      await dispatchEvent(event, sv.speed, dispatch);
      event = gen.next().value;
      sv = getState().sortingVisualizer;
    }

    if (!event) dispatch(setIsSorted(true));
    dispatch(resetIndices());
  }
);

const dispatchEvent = async (
  event: SortEvent,
  speed: number,
  dispatch: ThunkDispatch<RootState, unknown, AnyAction>
) => {
  dispatch(setSwapIndices([]));
  switch (event.type) {
    case SortEventType.swap:
      dispatch(setSwapIndices(event.indices));
      await _sleep(speed);
      dispatch(swapValues(event.indices));
      break;
    case SortEventType.compare:
      dispatch(setCompareIndices(event.indices));
      break;
    case SortEventType.sort:
      dispatch(addSortedIndices(event.indices));
      break;
    case SortEventType.pivot:
      dispatch(setPivot(event.indices[0]));
      break;
    case SortEventType.set:
      dispatch(setSwapIndices(event.indices));
      await _sleep(speed);
      dispatch(changeValue([event.indices[0], event.value!]));
      break;
    default:
      break;
  }
  await _sleep(speed);
};

const _sleep = async (speed: number) => await sleep(1000 / speed ** 4);

export const {
  reset,
  setPivot,
  swapValues,
  setMode,
  resetIndices,
  stopSorting,
  addSortedIndices,
  setIsSorted,
  setIsSorting,
  changeValue,
  setSpeed,
  setArrayLength,
  setAlgorithm,
  setSwapIndices,
  setCompareIndices,
} = sortVisualizerSlice.actions;

export default sortVisualizerSlice;
