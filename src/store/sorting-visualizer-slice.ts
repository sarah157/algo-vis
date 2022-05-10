import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { generateArray, sleep, swap } from "../helpers";
import {
  SortEvent,
  SortAlgorithm,
  SortEventType,
  initialArrayLength,
  minArrayValue,
  maxArrayValue,
  initialSpeed,
  maxSpeed,
} from "../constants";
import { RootState } from ".";

import * as sorters from "../algorithms"

interface SortingVisualizerState {
  array: number[];
  arrayLength: number;
  speed: number;
  algorithm: SortAlgorithm;
  swapIndices: number[] | undefined;
  compareIndices: number[];
  sortedIndices: number[];
  isSorted: boolean;
  isSorting: boolean;
}

const initialState: SortingVisualizerState = {
  array: generateArray(initialArrayLength, minArrayValue, maxArrayValue),
  arrayLength: initialArrayLength,
  speed: initialSpeed,
  algorithm: SortAlgorithm.bubbleSort,
  swapIndices: [],
  compareIndices: [],
  sortedIndices: [],
  isSorted: false,
  isSorting: false,
};

export const startSorting = createAsyncThunk<void, void, {state: RootState}>(
  "startSorting",
  async (_, { dispatch, getState }) => {
    dispatch(setIsSorting(true));
    let sv: SortingVisualizerState = getState().sortingVisualizer;

    const gen: Generator<SortEvent> = sorters[sv.algorithm]([...sv.array]);
    let event: SortEvent = gen.next().value;

    while (event && sv.isSorting) {
      dispatchEvent();
      if (sv.speed < maxSpeed) await sleep(1000 / sv.speed**4);
      event = gen.next().value;
      sv = getState().sortingVisualizer
    }

    if (!event) dispatch(setIsSorted(true));
    dispatch(resetIndices());

    function dispatchEvent() {
      dispatch(resetIndices());
      switch (event.type) {
        case SortEventType.swap:
          dispatch(setSwapIndices(event.indices));
          break;
        case SortEventType.compare:
          dispatch(setCompareIndices(event.indices));
          break;
        case SortEventType.sortIndex:
          dispatch(addSortedIndices(event.indices));
          break;
        case SortEventType.set:
          dispatch(setIndexValue([event.indices[0], event.value || 0]));
          break;
        case SortEventType.sortComplete:
          dispatch(setIsSorted(true));
          break;
        default:
          break;
      }
    }
  }
);

const sortVisualizerSlice = createSlice({
  name: "sortvisualizer",
  initialState: initialState,
  reducers: {
    reset(state) {
      state.swapIndices = [];
      state.compareIndices = [];
      state.sortedIndices = [];
      state.array = generateArray(state.arrayLength, minArrayValue, maxArrayValue);
    },
    setIndexValue(state, action: PayloadAction<number[]>) {
      const [index1, value] = action.payload;
      state.array[index1] = value;
    },
    resetIndices(state) {
      state.swapIndices = [];
      state.compareIndices = [];
    },
    stopSorting(state) {
      state.isSorting = false;
    },
    addSortedIndices(state, action: PayloadAction<number[]>) {
      state.sortedIndices = [...state.sortedIndices, ...action.payload];
    },
    setIsSorting(state, action: PayloadAction<boolean>) {
      state.isSorting = action.payload;
    },
    setIsSorted(state, action: PayloadAction<boolean>) {
      state.isSorted = action.payload;
      state.sortedIndices = Array.from({length: state.arrayLength}, (x, i) => i);
      if (state.isSorted) {
        state.isSorting = false;
      }
    },
    setArrayLength(state, action: PayloadAction<number>) {
      if (action.payload === state.arrayLength) return;
      state.arrayLength = action.payload;
      state.array = generateArray(state.arrayLength, minArrayValue, maxArrayValue);
      state.swapIndices = [];
      state.compareIndices = [];
      state.sortedIndices = [];
    },
    setSpeed(state, action: PayloadAction<number>) {
      state.speed = action.payload;
    },
    setAlgorithm(state, action: PayloadAction<SortAlgorithm>) {
      state.algorithm = action.payload;
    },
    setSwapIndices(state, action: PayloadAction<number[]>) {
      const [i, j] = action.payload;
      state.swapIndices = [i, j];
      swap(state.array, i, j);
    },
    setCompareIndices(state, action: PayloadAction<number[]>) {
      state.compareIndices = action.payload;
    },
  },
});

export const {
  reset,
  resetIndices,
  stopSorting,
  addSortedIndices,
  setIsSorted,
  setIsSorting,
  setIndexValue,
  setSpeed,
  setArrayLength,
  setAlgorithm,
  setSwapIndices,
  setCompareIndices,
} = sortVisualizerSlice.actions;

export default sortVisualizerSlice;
