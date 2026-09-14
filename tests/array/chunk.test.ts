import { describe, expect, it } from "vitest";

import { chunk } from "../../src/array/chunk.js";

describe("chunk", () => {
  it("returns an empty array for an empty input", () => {
    expect(chunk([], 2)).toEqual([]);
  });

  it("returns the whole array when size is larger than the array", () => {
    expect(chunk([1, 2, 3], 10)).toEqual([[1, 2, 3]]);
  });

  it("splits the array into chunks with the given size", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("returns each element in its own chunk", () => {
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });

  it("throws an error when size is zero", () => {
    expect(() => chunk([1, 2, 3], 0)).toThrow(
      "Chunk size must be greater than 0",
    );
  });

  it("throws an error when size is negative", () => {
    expect(() => chunk([1, 2, 3], -1)).toThrow(
      "Chunk size must be greater than 0",
    );
  });
});
