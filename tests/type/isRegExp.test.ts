import { describe, expect, it } from "vitest";
import { isRegExp } from "../../src/type/isRegExp.js";

describe("isRegExp", () => {
  it("returns true for a regular expression literal", () => {
    expect(isRegExp(/hello/)).toBe(true);
  });

  it("returns true for an empty regular expression", () => {
    expect(isRegExp(new RegExp(""))).toBe(true);
  });
  
  it("returns true for a RegExp created with the constructor", () => {
    expect(isRegExp(new RegExp("hello"))).toBe(true);
  });

  it("returns true for a RegExp with flags", () => {
    expect(isRegExp(/hello/gi)).toBe(true);
  });

  it("returns true for a RegExp with multiple flags", () => {
    expect(isRegExp(new RegExp("hello", "gim"))).toBe(true);
  });

  it("returns true for a RegExp with special characters", () => {
    expect(isRegExp(/[a-z]+@[a-z]+\\.com/)).toBe(true);
  });

  it("returns false for a string", () => {
    expect(isRegExp("hello")).toBe(false);
  });

  it("returns false for a string that looks like a RegExp", () => {
    expect(isRegExp("/hello/")).toBe(false);
  });

  it("returns false for a number", () => {
    expect(isRegExp(42)).toBe(false);
  });

  it("returns false for a boolean", () => {
    expect(isRegExp(true)).toBe(false);
  });

  it("returns false for null", () => {
    expect(isRegExp(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isRegExp(undefined)).toBe(false);
  });

  it("returns false for an object", () => {
    expect(isRegExp({})).toBe(false);
  });

  it("returns false for an array", () => {
    expect(isRegExp([])).toBe(false);
  });

  it("returns false for a function", () => {
    expect(isRegExp(() => {})).toBe(false);
  });

  it("returns false for a Date", () => {
    expect(isRegExp(new Date())).toBe(false);
  });

  it("returns false for a Map", () => {
    expect(isRegExp(new Map())).toBe(false);
  });

  it("returns false for a Set", () => {
    expect(isRegExp(new Set())).toBe(false);
  });

  it("returns false for a Symbol", () => {
    expect(isRegExp(Symbol("test"))).toBe(false);
  });

  it("returns false for a BigInt", () => {
    expect(isRegExp(123n)).toBe(false);
  });

  it("does not mutate the input", () => {
    const value = /hello/gi;

    isRegExp(value);

    expect(value.source).toBe("hello");
    expect(value.flags).toBe("gi");
  });
});
