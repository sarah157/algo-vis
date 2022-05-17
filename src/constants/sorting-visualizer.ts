export enum SortAlgorithm {
  bubbleSort = "bubbleSort",
  insertionSort = "insertionSort",
  quickSort = "quickSort",
  mergeSort = "mergeSort",
  selectionSort = "selectionSort"
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
export const initialSpeed = 2;
export const maxArrayLength = 100;
export const minArrayLength = 10;
export const arrayLengthStep = 1;
export const maxArrayValue = 50;
export const minArrayValue = 5;
export const maxSpeed = 100;
export const minSpeed = 1;
export const speedStep = 1;
