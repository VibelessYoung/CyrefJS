import { describe, expect, it } from "vitest";
import { take } from "../../src/array/take.js";

describe("take", () => {
  it("should take the first n elements", () => {
    expect(take([1, 2, 3, 4, 5], 3)).toEqual([1, 2, 3]);
  });

  it("should take one element", () => {
    expect(take([1, 2, 3], 1)).toEqual([1]);
  });

  it("should return the whole array when n is greater than array length", () => {
    expect(take([1, 2, 3], 10)).toEqual([1, 2, 3]);
  });

  it("should return the whole array when n equals array length", () => {
    expect(take([1, 2, 3], 3)).toEqual([1, 2, 3]);
  });

  it("should return an empty array when n is zero", () => {
    expect(take([1, 2, 3], 0)).toEqual([]);
  });

  it("should return an empty array when n is negative", () => {
    expect(take([1, 2, 3], -2)).toEqual([]);
  });

  it("should return an empty array when the input array is empty", () => {
    expect(take([], 3)).toEqual([]);
  });

  it("should work with strings", () => {
    expect(take(["a", "b", "c"], 2)).toEqual(["a", "b"]);
  });

  it("should not mutate the original array", () => {
    const array = [1, 2, 3, 4];

    take(array, 2);

    expect(array).toEqual([1, 2, 3, 4]);
  });

  it("should return a new array", () => {
    const array = [1, 2, 3];

    const result = take(array, 3);

    expect(result).not.toBe(array);
  });
});
