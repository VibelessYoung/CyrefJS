import { describe, expect, it } from "vitest";
import { drop } from "../../src/array/drop.js";

describe("drop", () => {
  it("should drop the first n elements", () => {
    expect(drop([1, 2, 3, 4, 5], 2)).toEqual([3, 4, 5]);
  });

  it("should drop one element", () => {
    expect(drop([1, 2, 3], 1)).toEqual([2, 3]);
  });

  it("should return an empty array when n is greater than array length", () => {
    expect(drop([1, 2, 3], 10)).toEqual([]);
  });

  it("should return an empty array when n equals array length", () => {
    expect(drop([1, 2, 3], 3)).toEqual([]);
  });

  it("should return a copy of the array when n is zero", () => {
    const array = [1, 2, 3];

    const result = drop(array, 0);

    expect(result).toEqual([1, 2, 3]);
    expect(result).not.toBe(array);
  });

  it("should return a copy of the array when n is negative", () => {
    const array = [1, 2, 3];

    const result = drop(array, -2);

    expect(result).toEqual([1, 2, 3]);
    expect(result).not.toBe(array);
  });

  it("should return an empty array when the input array is empty", () => {
    expect(drop([], 3)).toEqual([]);
  });

  it("should work with strings", () => {
    expect(drop(["a", "b", "c", "d"], 2)).toEqual(["c", "d"]);
  });

  it("should not mutate the original array", () => {
    const array = [1, 2, 3, 4];

    drop(array, 2);

    expect(array).toEqual([1, 2, 3, 4]);
  });

  it("should return a new array", () => {
    const array = [1, 2, 3];

    const result = drop(array, 1);

    expect(result).not.toBe(array);
  });
});
