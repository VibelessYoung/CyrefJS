import { describe, expect, it } from "vitest";
import { isObject } from "../../src/type/isObject.js";

describe("isObject", () => {
  it("returns true for an empty object", () => {
    expect(isObject({})).toBe(true);
  });

  it("returns true for an object with properties", () => {
    expect(isObject({ name: "Amir", age: 20 })).toBe(true);
  });

  it("returns true for an object with nested objects", () => {
    expect(
      isObject({
        user: {
          name: "Amir",
        },
      }),
    ).toBe(true);
  });

  it("returns true for an object with an array property", () => {
    expect(
      isObject({
        items: [1, 2, 3],
      }),
    ).toBe(true);
  });

  it("returns true for an object created with Object constructor", () => {
    expect(isObject(new Object())).toBe(true);
  });

  it("returns true for an object with a null prototype", () => {
    expect(isObject(Object.create(null))).toBe(true);
  });

  it("returns true for an object with symbol keys", () => {
    const key = Symbol("key");
    const value = {
      [key]: "value",
    };

    expect(isObject(value)).toBe(true);
  });

  it("returns true for an object with numeric keys", () => {
    const value = {
      0: "zero",
      1: "one",
    };

    expect(isObject(value)).toBe(true);
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

  it("returns false for an array", () => {
    expect(isObject([])).toBe(false);
  });

  it("returns false for an array with values", () => {
    expect(isObject([1, 2, 3])).toBe(false);
  });

  it("returns false for a Date object", () => {
    expect(isObject(new Date())).toBe(false);
  });

  it("returns false for a RegExp object", () => {
    expect(isObject(/test/)).toBe(false);
  });

  it("returns false for a Map", () => {
    expect(isObject(new Map())).toBe(false);
  });

  it("returns false for a Set", () => {
    expect(isObject(new Set())).toBe(false);
  });

  it("returns false for a WeakMap", () => {
    expect(isObject(new WeakMap())).toBe(false);
  });

  it("returns false for a WeakSet", () => {
    expect(isObject(new WeakSet())).toBe(false);
  });

  it("returns false for a Promise", () => {
    expect(isObject(Promise.resolve())).toBe(false);
  });

  it("returns false for a function", () => {
    expect(isObject(() => {})).toBe(false);
  });

  it("returns false for a class", () => {
    expect(isObject(class Example {})).toBe(false);
  });

  it("does not mutate the object", () => {
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

  it("returns true for an object with an inherited property", () => {
    const parent = {
      inherited: true,
    };

    const value = Object.create(parent);
    value.own = true;

    expect(isObject(value)).toBe(false);
  });
});
