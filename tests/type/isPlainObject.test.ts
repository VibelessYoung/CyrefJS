import { describe, expect, it } from "vitest";
import { isPlainObject } from "../../src/type/isPlainObject.js";

describe("isPlainObject", () => {
  it("returns true for an empty object", () => {
    expect(isPlainObject({})).toBe(true);
  });

  it("returns true for an object with properties", () => {
    expect(
      isPlainObject({
        name: "Amir",
        age: 20,
      }),
    ).toBe(true);
  });

  it("returns true for a nested object", () => {
    expect(
      isPlainObject({
        user: {
          name: "Amir",
        },
      }),
    ).toBe(true);
  });

  it("returns true for an object containing arrays", () => {
    expect(
      isPlainObject({
        items: [1, 2, 3],
      }),
    ).toBe(true);
  });

  it("returns true for an object created with Object constructor", () => {
    expect(isPlainObject(new Object())).toBe(true);
  });

  it("returns true for an object with a null prototype", () => {
    expect(isPlainObject(Object.create(null))).toBe(true);
  });

  it("returns true for an object with symbol keys", () => {
    const key = Symbol("key");

    const value = {
      [key]: "value",
    };

    expect(isPlainObject(value)).toBe(true);
  });

  it("returns true for an object with numeric keys", () => {
    const value = {
      0: "zero",
      1: "one",
    };

    expect(isPlainObject(value)).toBe(true);
  });

  it("returns true for an object with a null value", () => {
    expect(
      isPlainObject({
        value: null,
      }),
    ).toBe(true);
  });

  it("returns true for an object with undefined value", () => {
    expect(
      isPlainObject({
        value: undefined,
      }),
    ).toBe(true);
  });

  it("returns false for null", () => {
    expect(isPlainObject(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isPlainObject(undefined)).toBe(false);
  });

  it("returns false for a string", () => {
    expect(isPlainObject("hello")).toBe(false);
  });

  it("returns false for a number", () => {
    expect(isPlainObject(42)).toBe(false);
  });

  it("returns false for NaN", () => {
    expect(isPlainObject(NaN)).toBe(false);
  });

  it("returns false for Infinity", () => {
    expect(isPlainObject(Infinity)).toBe(false);
  });

  it("returns false for a boolean", () => {
    expect(isPlainObject(true)).toBe(false);
  });

  it("returns false for a symbol", () => {
    expect(isPlainObject(Symbol("test"))).toBe(false);
  });

  it("returns false for a bigint", () => {
    expect(isPlainObject(123n)).toBe(false);
  });

  it("returns false for an array", () => {
    expect(isPlainObject([])).toBe(false);
  });

  it("returns false for an array with values", () => {
    expect(isPlainObject([1, 2, 3])).toBe(false);
  });

  it("returns false for a Date object", () => {
    expect(isPlainObject(new Date())).toBe(false);
  });

  it("returns false for a RegExp object", () => {
    expect(isPlainObject(/test/)).toBe(false);
  });

  it("returns false for a Map", () => {
    expect(isPlainObject(new Map())).toBe(false);
  });

  it("returns false for a Set", () => {
    expect(isPlainObject(new Set())).toBe(false);
  });

  it("returns false for a WeakMap", () => {
    expect(isPlainObject(new WeakMap())).toBe(false);
  });

  it("returns false for a WeakSet", () => {
    expect(isPlainObject(new WeakSet())).toBe(false);
  });

  it("returns false for a Promise", () => {
    expect(isPlainObject(Promise.resolve())).toBe(false);
  });

  it("returns false for a function", () => {
    expect(isPlainObject(() => {})).toBe(false);
  });

  it("returns false for a class", () => {
    expect(isPlainObject(class Example {})).toBe(false);
  });

  it("returns false for an object with a custom prototype", () => {
    const prototype = {
      inherited: true,
    };

    const value = Object.create(prototype);
    value.own = true;

    expect(isPlainObject(value)).toBe(false);
  });

  it("returns false for an instance of a custom class", () => {
    class User {
      name = "Amir";
    }

    expect(isPlainObject(new User())).toBe(false);
  });

  it("does not mutate the input object", () => {
    const value = {
      name: "Amir",
      age: 20,
    };

    isPlainObject(value);

    expect(value).toEqual({
      name: "Amir",
      age: 20,
    });
  });
});
