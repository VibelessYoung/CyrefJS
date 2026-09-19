import { describe, expect, it } from "vitest";
import { isNumber } from "../../src/type/isNumber.js";

describe("isNumber", () => {
  it("returns true for a positive integer", () => {
    expect(isNumber(42)).toBe(true);
  });

  it("returns true for a negative integer", () => {
    expect(isNumber(-42)).toBe(true);
  });

  it("returns true for zero", () => {
    expect(isNumber(0)).toBe(true);
  });

  it("returns true for a positive decimal", () => {
    expect(isNumber(3.14)).toBe(true);
  });

  it("returns true for a negative decimal", () => {
    expect(isNumber(-3.14)).toBe(true);
  });

  it("returns true for NaN", () => {
    expect(isNumber(NaN)).toBe(true);
  });

  it("returns true for Infinity", () => {
    expect(isNumber(Infinity)).toBe(true);
  });

  it("returns true for negative Infinity", () => {
    expect(isNumber(-Infinity)).toBe(true);
  });

  it("returns true for a very large number", () => {
    expect(isNumber(Number.MAX_VALUE)).toBe(true);
  });

  it("returns true for a very small positive number", () => {
    expect(isNumber(Number.MIN_VALUE)).toBe(true);
  });

  it("returns true for a negative zero", () => {
    expect(isNumber(-0)).toBe(true);
  });

  it("returns false for a string", () => {
    expect(isNumber("42")).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(isNumber("")).toBe(false);
  });

  it("returns false for a boolean", () => {
    expect(isNumber(true)).toBe(false);
  });

  it("returns false for false", () => {
    expect(isNumber(false)).toBe(false);
  });

  it("returns false for null", () => {
    expect(isNumber(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isNumber(undefined)).toBe(false);
  });

  it("returns false for an object", () => {
    expect(isNumber({})).toBe(false);
  });

  it("returns false for an array", () => {
    expect(isNumber([])).toBe(false);
  });

  it("returns false for a function", () => {
    expect(isNumber(() => {})).toBe(false);
  });

  it("returns false for a Symbol", () => {
    expect(isNumber(Symbol("test"))).toBe(false);
  });

  it("returns false for a BigInt", () => {
    expect(isNumber(123n)).toBe(false);
  });

  it("returns false for a Number object", () => {
    expect(isNumber(new Number(42))).toBe(false);
  });

  it("does not mutate the input", () => {
    const value = 42;

    isNumber(value);

    expect(value).toBe(42);
  });
});
