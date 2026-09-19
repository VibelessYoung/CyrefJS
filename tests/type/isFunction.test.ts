import { describe, expect, it } from "vitest";
import { isFunction } from "../../src/type/isFunction.js";

describe("isFunction", () => {
  it("returns true for an arrow function", () => {
    expect(isFunction(() => {})).toBe(true);
  });

  it("returns true for a regular function", () => {
    expect(isFunction(function () {})).toBe(true);
  });

  it("returns true for a named function", () => {
    function testFunction() {}

    expect(isFunction(testFunction)).toBe(true);
  });

  it("returns true for an async function", () => {
    expect(isFunction(async () => {})).toBe(true);
  });

  it("returns true for a generator function", () => {
    expect(
      isFunction(function* () {
        yield 1;
      }),
    ).toBe(true);
  });

  it("returns true for a class", () => {
    expect(isFunction(class Example {})).toBe(true);
  });

  it("returns true for a built-in function", () => {
    expect(isFunction(Math.max)).toBe(true);
  });

  it("returns true for a constructor function", () => {
    expect(isFunction(Date)).toBe(true);
  });

  it("returns false for a string", () => {
    expect(isFunction("hello")).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(isFunction("")).toBe(false);
  });

  it("returns false for a number", () => {
    expect(isFunction(42)).toBe(false);
  });

  it("returns false for NaN", () => {
    expect(isFunction(NaN)).toBe(false);
  });

  it("returns false for Infinity", () => {
    expect(isFunction(Infinity)).toBe(false);
  });

  it("returns false for a boolean", () => {
    expect(isFunction(true)).toBe(false);
  });

  it("returns false for null", () => {
    expect(isFunction(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isFunction(undefined)).toBe(false);
  });

  it("returns false for an object", () => {
    expect(isFunction({})).toBe(false);
  });

  it("returns false for an array", () => {
    expect(isFunction([])).toBe(false);
  });

  it("returns false for a Date object", () => {
    expect(isFunction(new Date())).toBe(false);
  });

  it("returns false for a RegExp object", () => {
    expect(isFunction(/test/)).toBe(false);
  });

  it("returns false for a Map", () => {
    expect(isFunction(new Map())).toBe(false);
  });

  it("returns false for a Set", () => {
    expect(isFunction(new Set())).toBe(false);
  });

  it("returns false for a Symbol", () => {
    expect(isFunction(Symbol("test"))).toBe(false);
  });

  it("returns false for a BigInt", () => {
    expect(isFunction(123n)).toBe(false);
  });

  it("does not mutate the input", () => {
    const value = () => {};

    isFunction(value);

    expect(typeof value).toBe("function");
  });
});
