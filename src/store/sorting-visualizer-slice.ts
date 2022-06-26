import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  ThunkDispatch,
  AnyAction,
} from "@reduxjs/toolkit";
import { generateArray, getSorter, sleep, swap } from "../helpers";
import {
  SortEvent,
  SortAlgorithm,
  SortEventType,
  initialArrayLength,
  minArrayValue,
  maxArrayValue,
  Mode,
  speedToDelay,
} from "../models";
import { RootState } from ".";
import { CommonSettingsState } from "./common-settings-slice";


interface SortingVisualizerState {
  array: number[];
  arrayLength: number;
  algorithm: SortAlgorithm;
  swapIndices: number[] | undefined;  // indices being swapped or changing values
  compareIndices: number[];           // indices being compared
  sortedIndices: number[];            // indices that are sorted
  pivotIndex: number;                 // pivot index for quick sort
  isSorted: boolean;                  
  isSorting: boolean;
  mode: Mode;
}

const initialState: SortingVisualizerState = {
  array: generateArray(initialArrayLength, minArrayValue, maxArrayValue),
  arrayLength: initialArrayLength,
  algorithm: SortAlgorithm.bubbleSort,
  swapIndices: [],
  compareIndices: [],
  sortedIndices: [],
  pivotIndex: -1,
  isSorted: false,
  isSorting: false,
  mode: Mode.bar,
};

const sortingVisualizerSlice = createSlice({
  name: "sortingvisualizer",
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
    setPivot(state, action: PayloadAction<number>) {
      state.pivotIndex = action.payload;
    },
    resetIndices(state) {
      state.swapIndices = [];
      state.compareIndices = [];
      state.pivotIndex = -1;
    },
    setMode(state, action: PayloadAction<Mode>) {
      state.mode = action.payload;
    },
    swapValues(state, action: PayloadAction<number[]>) {
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
    let cs: CommonSettingsState = getState().commonSettings;
    const gen: Generator<SortEvent> = getSorter(sv.algorithm,[ ...sv.array]);
    let event: SortEvent = gen.next().value;

    while (event && sv.isSorting) {
      await dispatchEvent(event, speedToDelay[cs.speed], dispatch);
      event = gen.next().value;
      sv = getState().sortingVisualizer;
      cs = getState().commonSettings;
    }

    if (!event) dispatch(setIsSorted(true)); // otherwise loop ended because user clicked stop (sv.isSorting = false)
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
      await sleep(speed / 2);
      dispatch(swapValues(event.indices));
      break;
    case SortEventType.compare:
      dispatch(setCompareIndices(event.indices));
      break;
    case SortEventType.addToSorted:
      dispatch(addSortedIndices(event.indices));
      break;
    case SortEventType.setPivot:
      dispatch(setPivot(event.indices[0]));
      break;
    case SortEventType.changeValue:
      dispatch(setSwapIndices(event.indices));
      await sleep(speed);
      dispatch(changeValue([event.indices[0], event.value!]));
      break;
    default:
      break;
  }
  await sleep(speed);
};

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
  setArrayLength,
  setAlgorithm,
  setSwapIndices,
  setCompareIndices,
} = sortingVisualizerSlice.actions;

export default sortingVisualizerSlice;
