import { describe, expect, it } from "vitest";

import { union } from "../../src/array/union.js";

describe("union", () => {
  it("combines two arrays and removes duplicate values", () => {
    expect(union([1, 2, 3], [3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });

  it("removes duplicates inside the first array", () => {
    expect(union([1, 1, 2, 2, 3], [])).toEqual([1, 2, 3]);
  });

  it("removes duplicates inside the second array", () => {
    expect(union([], [1, 1, 2, 2, 3])).toEqual([1, 2, 3]);
  });

  it("returns the unique values when both arrays are empty", () => {
    expect(union([], [])).toEqual([]);
  });

  it("returns unique values when the arrays contain no common values", () => {
    expect(union([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("returns unique values when both arrays contain the same values", () => {
    expect(union([1, 2, 3], [1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("works with strings", () => {
    expect(
      union(["apple", "banana", "orange"], ["banana", "grape", "apple"]),
    ).toEqual(["apple", "banana", "orange", "grape"]);
  });

  it("preserves the order of first occurrence", () => {
    expect(union([3, 1, 2], [2, 4, 1, 5])).toEqual([3, 1, 2, 4, 5]);
  });

  it("does not modify the original arrays", () => {
    const array = [1, 2, 2, 3];
    const values = [2, 3, 4];

    union(array, values);

    expect(array).toEqual([1, 2, 2, 3]);
    expect(values).toEqual([2, 3, 4]);
  });
});
