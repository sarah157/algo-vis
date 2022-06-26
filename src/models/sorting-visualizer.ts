export enum SortAlgorithm {
  bubbleSort = "bubbleSort",
  insertionSort = "insertionSort",
  selectionSort = "selectionSort",
  quickSort = "quickSort",
  mergeSort = "mergeSort",
  heapSort = "heapSort"
}

export enum Speed {
  slowest = "slowest", slow = "slow", normal = "normal", fast = "fast", fastest = "fastest"
}

export const speedToDelay: {[key: string]: number} = {
  slowest: 500, slow: 200, normal: 50, fast: 20, fastest:5
}

export enum SortEventType {
  swap,
  compare,
  addToSorted,
  changeValue,
  setPivot
}

export type SortEvent = {
  type: SortEventType;
  indices: number[];
  value?: number;
  pivot?: number,
}

export enum Mode {
  bar = "bar",
  scatter = "scatter"
}


export const initialArrayLength = 35;
export const maxArrayLength = 100;
export const minArrayLength = 10;
export const arrayLengthStep = 1;
export const maxArrayValue = 50;
export const minArrayValue = 5;
