import { SortEventType, SortEvent } from "../../models";
import { swap } from "../../helpers";

function* heapSort(array: number[]): Generator<SortEvent> {
  let heapSize = array.length;

  yield* heapify(array);
  // Repeatedly remove max element (root) until heap is empty.
  // Elements are removed in sorted ordered and are kept at the end of the array, after the entires used by the heap
  while (heapSize > 0) {
    // Swap root with last element in the heap.
    // This removes the root from the heap and adds it to the sorted list at the end
    yield { type: SortEventType.swap, indices: [heapSize - 1, 0] };
    swap(array, heapSize - 1, 0);
    yield { type: SortEventType.addToSorted, indices: [heapSize - 1] };
    // heapSize decreases by 1
    heapSize--;
    // Reform the heap by bubbling down the new value at the root to its correct position
    yield* bubbleDown(array, heapSize, 0);
  }
}

function* bubbleDown(
  array: number[],
  heapSize: number,
  i: number
): Generator<SortEvent> {
  // find the largest among parent (index i) and children (right and left)
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  yield { type: SortEventType.compare, indices: [largest, left] };
  if (left < heapSize && array[i] < array[left]) {
    largest = left;
  }
  yield { type: SortEventType.compare, indices: [largest, right] };
  if (right < heapSize && array[largest] < array[right]) {
    largest = right;
  }

  if (largest != i) {
    yield { type: SortEventType.swap, indices: [i, largest] };
    swap(array, i, largest);
    yield* bubbleDown(array, heapSize, largest);
  }
}

function* heapify(array: number[]): Generator<SortEvent> {
  const heapSize = array.length;
  for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
    yield* bubbleDown(array, heapSize, i);
  }
}

export default heapSort;
