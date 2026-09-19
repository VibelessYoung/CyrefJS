import { describe, expect, it } from "vitest";
import { isNil } from "../../src/type/isNil.js";

describe("isNil", () => {
  it("returns true for null", () => {
    expect(isNil(null)).toBe(true);
  });

  it("returns true for undefined", () => {
    expect(isNil(undefined)).toBe(true);
  });

  it("returns true for void 0", () => {
    expect(isNil(void 0)).toBe(true);
  });

  it("returns false for true", () => {
    expect(isNil(true)).toBe(false);
  });

  it("returns false for false", () => {
    expect(isNil(false)).toBe(false);
  });

  it("returns false for zero", () => {
    expect(isNil(0)).toBe(false);
  });

  it("returns false for a negative number", () => {
    expect(isNil(-42)).toBe(false);
  });

  it("returns false for NaN", () => {
    expect(isNil(NaN)).toBe(false);
  });

  it("returns false for Infinity", () => {
    expect(isNil(Infinity)).toBe(false);
  });

  it("returns false for a string", () => {
    expect(isNil("null")).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(isNil("")).toBe(false);
  });

  it("returns false for an object", () => {
    expect(isNil({})).toBe(false);
  });

  it("returns false for an array", () => {
    expect(isNil([])).toBe(false);
  });

  it("returns false for a function", () => {
    expect(isNil(() => {})).toBe(false);
  });

  it("returns false for a Symbol", () => {
    expect(isNil(Symbol("test"))).toBe(false);
  });

  it("returns false for a BigInt", () => {
    expect(isNil(123n)).toBe(false);
  });

  it("does not mutate the input", () => {
    const value = null;

    isNil(value);

    expect(value).toBeNull();
  });
});
