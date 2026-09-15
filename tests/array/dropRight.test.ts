import { describe, expect, it } from "vitest";
import { dropRight } from "../../src/array/dropRight.js";

describe("dropRight", () => {
  it("should drop the last n elements", () => {
    expect(dropRight([1, 2, 3, 4, 5], 2)).toEqual([1, 2, 3]);
  });

  it("should drop one element from the end", () => {
    expect(dropRight([1, 2, 3], 1)).toEqual([1, 2]);
  });

  it("should return an empty array when n is greater than array length", () => {
    expect(dropRight([1, 2, 3], 10)).toEqual([]);
  });

  it("should return an empty array when n equals array length", () => {
    expect(dropRight([1, 2, 3], 3)).toEqual([]);
  });

  it("should return a copy of the array when n is zero", () => {
    const array = [1, 2, 3];

    const result = dropRight(array, 0);

    expect(result).toEqual([1, 2, 3]);
    expect(result).not.toBe(array);
  });

  it("should return a copy of the array when n is negative", () => {
    const array = [1, 2, 3];

    const result = dropRight(array, -2);

    expect(result).toEqual([1, 2, 3]);
    expect(result).not.toBe(array);
  });

  it("should return an empty array when the input array is empty", () => {
    expect(dropRight([], 3)).toEqual([]);
  });

  it("should work with strings", () => {
    expect(dropRight(["a", "b", "c", "d"], 2)).toEqual(["a", "b"]);
  });

  it("should not mutate the original array", () => {
    const array = [1, 2, 3, 4];

    dropRight(array, 2);

    expect(array).toEqual([1, 2, 3, 4]);
  });

  it("should return a new array", () => {
    const array = [1, 2, 3];

    const result = dropRight(array, 1);

    expect(result).not.toBe(array);
  });
});
