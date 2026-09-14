import { describe, expect, it } from "vitest";
import { flatten } from "../../src/array/flatten.js";

describe("flatten", () => {
  it("flattens an array of arrays into a single array", () => {
    expect(
      flatten([
        [1, 2],
        [3, 4],
        [5, 6],
      ]),
    ).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("returns an empty array for an empty input", () => {
    expect(flatten([])).toEqual([]);
  });

  it("handles a single inner array", () => {
    expect(flatten([[1, 2, 3]])).toEqual([1, 2, 3]);
  });

  it("handles empty inner arrays", () => {
    expect(flatten([[], [1, 2], [], [3]])).toEqual([1, 2, 3]);
  });

  it("preserves the order of elements", () => {
    expect(flatten([[3, 1], [4, 2], [5]])).toEqual([3, 1, 4, 2, 5]);
  });

  it("works with strings", () => {
    expect(
      flatten([["apple", "banana"], ["orange"], ["grape", "melon"]]),
    ).toEqual(["apple", "banana", "orange", "grape", "melon"]);
  });

  it("works with boolean values", () => {
    expect(flatten([[true, false], [true], [false, false]])).toEqual([
      true,
      false,
      true,
      false,
      false,
    ]);
  });

  it("only flattens one level", () => {
    expect(flatten([[1, 2], [[3, 4]]])).toEqual([1, 2, [3, 4]]);
  });

  it("does not modify the original array", () => {
    const array = [
      [1, 2],
      [3, 4],
    ];

    flatten(array);

    expect(array).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it("handles duplicate values without removing them", () => {
    expect(
      flatten([
        [1, 1, 2],
        [2, 3, 3],
      ]),
    ).toEqual([1, 1, 2, 2, 3, 3]);
  });
});
