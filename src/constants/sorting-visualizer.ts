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
  sort,
  set,
  pivot
}

export interface SortEvent {
  type: SortEventType;
  indices: number[];
  value?: number;
  pivot?: number,
}

export const initialArrayLength = 35;
export const initialSpeed = 2;
export const maxArrayLength = 100;
export const minArrayLength = 10;
export const maxArrayValue = 50;
export const minArrayValue = 5;
export const maxSpeed = 5;
export const minSpeed = 1;
