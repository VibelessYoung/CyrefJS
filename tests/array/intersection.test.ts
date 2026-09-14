import { describe, expect, it } from "vitest";

import { intersection } from "../../src/array/intersection.js";

describe("intersection", () => {
  it("returns values that exist in both arrays", () => {
    expect(intersection([1, 2, 3, 4], [2, 4])).toEqual([2, 4]);
  });

  it("returns an empty array when there are no common values", () => {
    expect(intersection([1, 2, 3], [4, 5, 6])).toEqual([]);
  });

  it("returns an empty array when the first array is empty", () => {
    expect(intersection([], [1, 2, 3])).toEqual([]);
  });

  it("returns an empty array when the second array is empty", () => {
    expect(intersection([1, 2, 3], [])).toEqual([]);
  });

  it("returns all values when both arrays contain the same values", () => {
    expect(intersection([1, 2, 3], [1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("works with strings", () => {
    expect(
      intersection(["apple", "banana", "orange"], ["banana", "orange"]),
    ).toEqual(["banana", "orange"]);
  });

  it("preserves duplicate values from the first array", () => {
    expect(intersection([1, 1, 2, 3, 3], [1, 3])).toEqual([1, 1, 3, 3]);
  });

  it("does not add duplicate values from the second array", () => {
    expect(intersection([1, 2, 3], [1, 1, 2, 2])).toEqual([1, 2]);
  });

  it("does not modify the original arrays", () => {
    const array = [1, 2, 3];
    const values = [2, 3];

    intersection(array, values);

    expect(array).toEqual([1, 2, 3]);
    expect(values).toEqual([2, 3]);
  });
});
