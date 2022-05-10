import { SortEvent, SortEventType } from "../constants";
import { swap } from "../helpers";

function* quickSort(array: number[]): Generator<SortEvent> {
  yield* quickSortHelper(array, 0, array.length - 1);
}

function* quickSortHelper(array: number[], start: number, end: number): Generator<SortEvent> {
  if (start >= end) {
    yield { type: SortEventType.sort, indices: [start] };
  } else {
    const p = yield* partition(array, start, end);
    yield* quickSortHelper(array, start, p - 1);
    yield* quickSortHelper(array, p + 1, end);
  }
}

function* partition(array: number[], start: number, end: number): Generator<SortEvent, number> {
  let pivot = array[end];
  let i = start - 1;

  for (let j = start; j < end; j++) {
    yield { type: SortEventType.pivot, indices: [end] };
    yield { type: SortEventType.compare, indices: [j, end] };
    if (array[j] < pivot) {
      i++;
      if (i !== j) {
        yield { type: SortEventType.swap, indices: [i, j] };
        swap(array, i, j);
      }

    }
  }

  
  const pivotIdx = i + 1;

  if (pivotIdx !== end) {
    yield { type: SortEventType.swap, indices: [i + 1, end] };
    swap(array, i + 1, end)
  }
  yield { type: SortEventType.sort, indices: [pivotIdx] };
  return pivotIdx;
}



export default quickSort;