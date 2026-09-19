import { describe, expect, it } from "vitest";
import { isNull } from "../../src/type/isNull.js";

describe("isNull", () => {
  it("returns true for null", () => {
    expect(isNull(null)).toBe(true);
  });

  it("returns false for undefined", () => {
    expect(isNull(undefined)).toBe(false);
  });

  it("returns false for a boolean", () => {
    expect(isNull(true)).toBe(false);
  });

  it("returns false for false", () => {
    expect(isNull(false)).toBe(false);
  });

  it("returns false for zero", () => {
    expect(isNull(0)).toBe(false);
  });

  it("returns false for a number", () => {
    expect(isNull(42)).toBe(false);
  });

  it("returns false for NaN", () => {
    expect(isNull(NaN)).toBe(false);
  });

  it("returns false for Infinity", () => {
    expect(isNull(Infinity)).toBe(false);
  });

  it("returns false for a string", () => {
    expect(isNull("null")).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(isNull("")).toBe(false);
  });

  it("returns false for an object", () => {
    expect(isNull({})).toBe(false);
  });

  it("returns false for an array", () => {
    expect(isNull([])).toBe(false);
  });

  it("returns false for a function", () => {
    expect(isNull(() => {})).toBe(false);
  });

  it("returns false for a Symbol", () => {
    expect(isNull(Symbol("test"))).toBe(false);
  });

  it("returns false for a BigInt", () => {
    expect(isNull(123n)).toBe(false);
  });

  it("returns false for an object with a null prototype", () => {
    expect(isNull(Object.create(null))).toBe(false);
  });

  it("does not mutate the input", () => {
    const value = null;

    isNull(value);

    expect(value).toBeNull();
  });
});
