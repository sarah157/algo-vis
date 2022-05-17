import { SortEvent, SortEventType } from "../../constants";
import { swap } from "../../helpers";

function* selectionSort(array: number[]): Generator<SortEvent> {
  const len = array.length;

  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < len; j++) {
      yield { type: SortEventType.compare, indices: [j, minIndex] };
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }

    if (i !== minIndex) {
      yield { type: SortEventType.swap, indices: [i, minIndex] };
      swap(array, i, minIndex);
    }

    yield { type: SortEventType.addToSorted, indices: [i] };
  }
}

export default selectionSort;
