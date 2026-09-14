import { describe, expect, it } from "vitest";

import { compact } from "../../src/array/compact.js";

describe("compact", () => {
  it("removes falsy values from an array", () => {
    expect(compact([0, 1, false, 2, "", 3, null, undefined, NaN])).toEqual([
      1, 2, 3,
    ]);
  });

  it("returns an empty array for an empty input", () => {
    expect(compact([])).toEqual([]);
  });

  it("returns the same values when the array contains only truthy values", () => {
    expect(compact([1, 2, 3, "hello", true])).toEqual([1, 2, 3, "hello", true]);
  });

  it("returns an empty array when all values are falsy", () => {
    expect(compact([0, false, "", null, undefined, NaN])).toEqual([]);
  });

  it("does not modify the original array", () => {
    const array = [0, 1, false, 2];

    compact(array);

    expect(array).toEqual([0, 1, false, 2]);
  });

  it("keeps negative numbers and non-empty strings", () => {
    expect(compact([-1, 0, -5, "", "hello"])).toEqual([-1, -5, "hello"]);
  });
});
