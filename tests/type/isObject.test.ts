import { describe, expect, it } from "vitest";
import { isObject } from "../../src/type/isObject.js";

describe("isObject", () => {
  it("returns true for a plain object", () => {
    expect(isObject({})).toBe(true);
  });

  it("returns true for an object with properties", () => {
    expect(isObject({ name: "Amir", age: 20 })).toBe(true);
  });

  it("returns true for a nested object", () => {
    expect(
      isObject({
        user: {
          name: "Amir",
        },
      }),
    ).toBe(true);
  });

  it("returns true for an array", () => {
    expect(isObject([])).toBe(true);
  });

  it("returns true for an array with values", () => {
    expect(isObject([1, 2, 3])).toBe(true);
  });

  it("returns true for a Date object", () => {
    expect(isObject(new Date())).toBe(true);
  });

  it("returns true for a RegExp object", () => {
    expect(isObject(/test/)).toBe(true);
  });

  it("returns true for a Map", () => {
    expect(isObject(new Map())).toBe(true);
  });

  it("returns true for a Set", () => {
    expect(isObject(new Set())).toBe(true);
  });

  it("returns true for a WeakMap", () => {
    expect(isObject(new WeakMap())).toBe(true);
  });

  it("returns true for a WeakSet", () => {
    expect(isObject(new WeakSet())).toBe(true);
  });

  it("returns true for a Promise", () => {
    expect(isObject(Promise.resolve())).toBe(true);
  });

  it("returns true for an object created with Object.create", () => {
    expect(isObject(Object.create(null))).toBe(true);
  });

  it("returns false for null", () => {
    expect(isObject(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isObject(undefined)).toBe(false);
  });

  it("returns false for a string", () => {
    expect(isObject("hello")).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(isObject("")).toBe(false);
  });

  it("returns false for a number", () => {
    expect(isObject(42)).toBe(false);
  });

  it("returns false for zero", () => {
    expect(isObject(0)).toBe(false);
  });

  it("returns false for NaN", () => {
    expect(isObject(NaN)).toBe(false);
  });

  it("returns false for Infinity", () => {
    expect(isObject(Infinity)).toBe(false);
  });

  it("returns false for a boolean", () => {
    expect(isObject(true)).toBe(false);
  });

  it("returns false for a symbol", () => {
    expect(isObject(Symbol("test"))).toBe(false);
  });

  it("returns false for a bigint", () => {
    expect(isObject(123n)).toBe(false);
  });

  it("returns false for a function", () => {
    expect(isObject(() => {})).toBe(false);
  });

  it("returns false for an async function", () => {
    expect(isObject(async () => {})).toBe(false);
  });

  it("returns false for a class", () => {
    expect(isObject(class Example {})).toBe(false);
  });

  it("does not mutate the input object", () => {
    const value = {
      name: "Amir",
      age: 20,
    };

    isObject(value);

    expect(value).toEqual({
      name: "Amir",
      age: 20,
    });
  });
});
