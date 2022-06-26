import { SortEvent, SortEventType } from "../../models";
import { swap } from "../../helpers";

function* bubbleSort(array: number[]): Generator<SortEvent> {
  let swapped = true;
  let i = array.length;

  while (i > 0 && swapped) {
    swapped = false;
    for (let j = 0; j < i; j++) {
      yield { type: SortEventType.compare, indices: [j, j + 1] };
      if (array[j] > array[j + 1]) {
        yield { type: SortEventType.swap, indices: [j, j + 1] };
        swap(array, j, j + 1);
        swapped = true;
      }
    }
    yield { type: SortEventType.addToSorted, indices: [--i] };
  }
}

export default bubbleSort;
