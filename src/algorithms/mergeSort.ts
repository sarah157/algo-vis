import { SortEvent, SortEventType } from "../constants";

function* mergeSort(array: number[]): Generator<SortEvent> {
    yield* mergeSortHelper(array, 0, array.length - 1)
}

function* mergeSortHelper(array: number[], start: number, end: number): Generator<SortEvent> {
    if (start >= end) return
    const mid = start + Math.floor((end - start) / 2);
    yield* mergeSortHelper(array, start, mid);
    yield* mergeSortHelper(array, mid + 1, end);
    yield* merge(array, start, mid, end);
}

function* merge(array: number[], start: number, mid: number, end: number): Generator<SortEvent> {
    const arr = [...array];
    let i = start;
    let j = mid + 1;
    let k = start

    function* isLastMerge() {
        if (end - start === array.length - 1) {
            yield { type: SortEventType.addToSorted, indices: [k] };
        }
    }

    while (i <= mid && j <= end) {
        yield { type: SortEventType.compare, indices: [i, j] };
        if (arr[i] < arr[j]) {
            yield { type: SortEventType.changeValue, indices: [k, i], value: arr[i] };
            yield* isLastMerge();
            array[k++] = arr[i++]
        } else {
            yield { type: SortEventType.changeValue, indices: [k, j], value: arr[j] };
            yield* isLastMerge();
            array[k++] = arr[j++]
        }
    }

    while (i <= mid) {
        // yield { type: SortEventType.compare, indices: [i] };
        yield { type: SortEventType.changeValue, indices: [k, i], value: arr[i] };
        yield* isLastMerge();
        array[k++] = arr[i++]
    }

    while (j <= end) {
        // yield { type: SortEventType.compare, indices: [j] };
        yield { type: SortEventType.changeValue, indices: [k, j], value: arr[j] };
        yield* isLastMerge();
        array[k++] = arr[j++]
    }
}

export default mergeSort;
