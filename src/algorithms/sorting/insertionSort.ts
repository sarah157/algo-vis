import { SortEventType, SortEvent } from "../../constants";
import { swap } from "../../helpers";

function* insertionSort(array: number[]): Generator<SortEvent> {
  for (let i = 0; i < array.length; i++) {
    yield { type: SortEventType.addToSorted, indices: [i] };
    for (let j = i - 1; j >= 0; j--) {
      yield { type: SortEventType.compare, indices: [j, j + 1] };
      if (array[j + 1] < array[j]) {
        yield { type: SortEventType.swap, indices: [j, j + 1] };
        swap(array, j, j + 1);
      } else break;
    }
  }
}

export default insertionSort;
