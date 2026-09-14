import { describe, expect, it } from "vitest";
import { unique } from "../../src/array/unique.js";

describe("unique", () => {
  it("removes duplicate values", () => {
    expect(unique([1, 2, 2, 3, 1, 4])).toEqual([1, 2, 3, 4]);
  });

  it("returns an empty array for an empty input", () => {
    expect(unique([])).toEqual([]);
  });

  it("returns the same values when there are no duplicates", () => {
    expect(unique([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
  });

  it("removes duplicate strings", () => {
    expect(unique(["apple", "banana", "apple", "orange", "banana"])).toEqual([
      "apple",
      "banana",
      "orange",
    ]);
  });

  it("preserves the order of first occurrence", () => {
    expect(unique([3, 1, 2, 1, 3, 4])).toEqual([3, 1, 2, 4]);
  });

  it("works with boolean values", () => {
    expect(unique([true, false, true, false, true])).toEqual([true, false]);
  });

  it("keeps null and undefined as unique values", () => {
    expect(unique([null, undefined, null, undefined])).toEqual([
      null,
      undefined,
    ]);
  });

  it("treats NaN values as duplicates", () => {
    expect(unique([NaN, NaN, 1, NaN])).toEqual([NaN, 1]);
  });

  it("does not modify the original array", () => {
    const array = [1, 2, 2, 3];

    unique(array);

    expect(array).toEqual([1, 2, 2, 3]);
  });

  it("keeps different primitive types as different values", () => {
    const array: (string | number | boolean)[] = [
      1,
      "1",
      true,
      1,
      "1",
      false,
      true,
    ];

    expect(unique(array)).toEqual([1, "1", true, false]);
  });
});
