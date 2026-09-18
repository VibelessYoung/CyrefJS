import { describe, expect, it } from "vitest";
import { isArray } from "../../src/type/isArray.js";

describe("isArray", () => {
  it("returns true for an array of numbers", () => {
    expect(isArray([1, 2, 3])).toBe(true);
  });

  it("returns true for an array of strings", () => {
    expect(isArray(["a", "b", "c"])).toBe(true);
  });

  it("returns true for an empty array", () => {
    expect(isArray([])).toBe(true);
  });

  it("returns true for an array of mixed values", () => {
    expect(isArray([1, "hello", true, null, undefined])).toBe(true);
  });

  it("returns true for a nested array", () => {
    expect(
      isArray([
        [1, 2],
        [3, 4],
      ]),
    ).toBe(true);
  });

  it("returns true for an array containing objects", () => {
    expect(isArray([{ id: 1 }, { id: 2 }])).toBe(true);
  });

  it("returns true for an array containing functions", () => {
    expect(isArray([() => {}, () => {}])).toBe(true);
  });

  it("returns true for an array containing null", () => {
    expect(isArray([null])).toBe(true);
  });

  it("returns true for an array containing undefined", () => {
    expect(isArray([undefined])).toBe(true);
  });

  it("returns true for a sparse array", () => {
    const value = new Array(3);

    expect(isArray(value)).toBe(true);
  });

  it("returns true for an array created with Array constructor", () => {
    const value = new Array(3);

    expect(isArray(value)).toBe(true);
  });

  it("returns false for a string", () => {
    expect(isArray("hello")).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(isArray("")).toBe(false);
  });

  it("returns false for a number", () => {
    expect(isArray(42)).toBe(false);
  });

  it("returns false for zero", () => {
    expect(isArray(0)).toBe(false);
  });

  it("returns false for a boolean", () => {
    expect(isArray(true)).toBe(false);
  });

  it("returns false for null", () => {
    expect(isArray(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isArray(undefined)).toBe(false);
  });

  it("returns false for an object", () => {
    expect(isArray({})).toBe(false);
  });

  it("returns false for an object with numeric keys", () => {
    expect(isArray({ 0: "a", 1: "b", length: 2 })).toBe(false);
  });

  it("returns false for a function", () => {
    expect(isArray(() => {})).toBe(false);
  });

  it("returns false for a regular expression", () => {
    expect(isArray(/hello/)).toBe(false);
  });

  it("returns false for a Date object", () => {
    expect(isArray(new Date())).toBe(false);
  });

  it("returns false for a Set", () => {
    expect(isArray(new Set())).toBe(false);
  });

  it("returns false for a Map", () => {
    expect(isArray(new Map())).toBe(false);
  });

  it("returns false for an Array-like object", () => {
    const value = {
      0: "a",
      1: "b",
      length: 2,
    };

    expect(isArray(value)).toBe(false);
  });

  it("does not mutate the array", () => {
    const value = [1, 2, 3];

    isArray(value);

    expect(value).toEqual([1, 2, 3]);
  });

  it("returns true for a deeply nested array", () => {
    const value = [[[[1]]]];

    expect(isArray(value)).toBe(true);
  });

  it("returns true for an array with a custom property", () => {
    const value = [1, 2, 3] as number[] & { custom?: string };
    value.custom = "test";

    expect(isArray(value)).toBe(true);
  });

  it("works with NaN", () => {
    expect(isArray(NaN)).toBe(false);
  });

  it("works with Infinity", () => {
    expect(isArray(Infinity)).toBe(false);
  });

  it("works with a Symbol", () => {
    expect(isArray(Symbol("test"))).toBe(false);
  });

  it("works with a BigInt", () => {
    expect(isArray(123n)).toBe(false);
  });
});
