import * as algos from "../../algorithms/sorting"
import { SortAlgorithm } from "../../models";

const array = [10, 100, 10, 22, 11, 3, 1, 2, 3, 7, 8, 9]
const jsSortedArray = [...array].sort((a, b) => a - b);

describe("sorting algorithms sort correctly", () => {
  for (let algo of Object.keys(SortAlgorithm)) {
    test(algo, () => {
      const arr = [...array]
      const gen = algos[algo as SortAlgorithm](arr)
      let next = gen.next();
      while (!next.done) {
        next = gen.next();
      }
      expect(arr).toEqual(jsSortedArray)
    })
  }
})