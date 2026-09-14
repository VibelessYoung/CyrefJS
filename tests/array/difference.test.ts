import { describe, expect, it } from "vitest";

import { difference } from "../../src/array/difference.js";

describe("difference", () => {
  it("returns values that exist in the first array but not in the second", () => {
    expect(difference([1, 2, 3, 4], [2, 4])).toEqual([1, 3]);
  });

  it("returns an empty array when both arrays contain the same values", () => {
    expect(difference([1, 2, 3], [1, 2, 3])).toEqual([]);
  });

  it("returns the first array when the second array is empty", () => {
    expect(difference([1, 2, 3], [])).toEqual([1, 2, 3]);
  });

  it("returns an empty array when the first array is empty", () => {
    expect(difference([], [1, 2, 3])).toEqual([]);
  });

  it("returns the first array when there is no overlap", () => {
    expect(difference([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3]);
  });

  it("works with strings", () => {
    expect(difference(["apple", "banana", "orange"], ["banana"])).toEqual([
      "apple",
      "orange",
    ]);
  });

  it("keeps duplicate values from the first array", () => {
    expect(difference([1, 1, 2, 3, 3], [2])).toEqual([1, 1, 3, 3]);
  });

  it("removes all occurrences of a value found in the second array", () => {
    expect(difference([1, 2, 2, 3, 2], [2])).toEqual([1, 3]);
  });

  it("does not modify the original arrays", () => {
    const array = [1, 2, 3];
    const values = [2];

    difference(array, values);

    expect(array).toEqual([1, 2, 3]);
    expect(values).toEqual([2]);
  });
});
