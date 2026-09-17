import { describe, expect, it } from "vitest";
import { flattenDeep } from "../../src/array/flattenDeep.js";

describe("flattenDeep", () => {
  it("flattens a nested array completely", () => {
    expect(flattenDeep<number>([1, [2, 3], [4, [5, 6]]])).toEqual([
      1, 2, 3, 4, 5, 6,
    ]);
  });

  it("returns an empty array for an empty input", () => {
    expect(flattenDeep<number>([])).toEqual([]);
  });

  it("handles a single-level array", () => {
    expect(flattenDeep<number>([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
  });

  it("handles deeply nested arrays", () => {
    expect(flattenDeep<number>([1, [2, [3, [4, [5]]]]])).toEqual([
      1, 2, 3, 4, 5,
    ]);
  });

  it("handles empty nested arrays", () => {
    expect(flattenDeep<number>([[], [1, 2], [[], [3]], []])).toEqual([1, 2, 3]);
  });

  it("preserves the order of values", () => {
    expect(
      flattenDeep<number>([
        [3, [1, 5]],
        [[2], 4],
      ]),
    ).toEqual([3, 1, 5, 2, 4]);
  });

  it("works with strings", () => {
    expect(
      flattenDeep<string>([["apple", ["banana"]], [["orange", "grape"]]]),
    ).toEqual(["apple", "banana", "orange", "grape"]);
  });

  it("works with boolean values", () => {
    expect(flattenDeep<boolean>([[true, [false]], [[true, false]]])).toEqual([
      true,
      false,
      true,
      false,
    ]);
  });

  it("preserves duplicate values", () => {
    expect(flattenDeep<number>([[1, 1], [2, [2, 3]], [[3]]])).toEqual([
      1, 1, 2, 2, 3, 3,
    ]);
  });

  it("does not modify the original array", () => {
    const array = [1, [2, [3]], [[4]]];

    flattenDeep<number>(array);

    expect(array).toEqual([1, [2, [3]], [[4]]]);
  });

  it("handles mixed nesting depths", () => {
    expect(flattenDeep<number>([1, [2, [3]], [[4, [5, [6]]]], 7])).toEqual([
      1, 2, 3, 4, 5, 6, 7,
    ]);
  });

  it("handles null and undefined values", () => {
    expect(
      flattenDeep<null | undefined | number>([
        null,
        [1, [undefined]],
        [[null]],
      ]),
    ).toEqual([null, 1, undefined, null]);
  });
});
