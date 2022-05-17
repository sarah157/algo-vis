import { SortEvent, SortEventType } from "../../constants";
import { swap } from "../../helpers";

function* bubbleSort(array: number[]): Generator<SortEvent> {
  const arr = [...array];
  let swapped = true;
  let i = arr.length;

  while (i > 0 && swapped) {
    swapped = false;
    for (let j = 0; j < i; j++) {
      yield { type: SortEventType.compare, indices: [j, j + 1] };
      if (arr[j] > arr[j + 1]) {
        yield { type: SortEventType.swap, indices: [j, j + 1] };
        swap(arr, j, j + 1);
        swapped = true;
      }
    }
    yield { type: SortEventType.addToSorted, indices: [--i] };
  }
}

export default bubbleSort;
