import { describe, expect, it } from "vitest";
import { takeRight } from "../../src/array/takeRight.js";

describe("takeRight", () => {
  it("should take the last n elements", () => {
    expect(takeRight([1, 2, 3, 4, 5], 2)).toEqual([4, 5]);
  });

  it("should take one element from the end", () => {
    expect(takeRight([1, 2, 3], 1)).toEqual([3]);
  });

  it("should return the whole array when n is greater than array length", () => {
    expect(takeRight([1, 2, 3], 10)).toEqual([1, 2, 3]);
  });

  it("should return the whole array when n equals array length", () => {
    expect(takeRight([1, 2, 3], 3)).toEqual([1, 2, 3]);
  });

  it("should return an empty array when n is zero", () => {
    expect(takeRight([1, 2, 3], 0)).toEqual([]);
  });

  it("should return an empty array when n is negative", () => {
    expect(takeRight([1, 2, 3], -2)).toEqual([]);
  });

  it("should return an empty array when the input array is empty", () => {
    expect(takeRight([], 3)).toEqual([]);
  });

  it("should work with strings", () => {
    expect(takeRight(["a", "b", "c"], 2)).toEqual(["b", "c"]);
  });

  it("should not mutate the original array", () => {
    const array = [1, 2, 3, 4];

    takeRight(array, 2);

    expect(array).toEqual([1, 2, 3, 4]);
  });

  it("should return a new array", () => {
    const array = [1, 2, 3];

    const result = takeRight(array, 3);

    expect(result).not.toBe(array);
  });
});
