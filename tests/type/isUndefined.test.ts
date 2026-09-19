import { describe, expect, it } from "vitest";
import { isUndefined } from "../../src/type/isUndefined.js";

describe("isUndefined", () => {
  it("returns true for undefined", () => {
    expect(isUndefined(undefined)).toBe(true);
  });

  it("returns true for void 0", () => {
    expect(isUndefined(void 0)).toBe(true);
  });

  it("returns false for null", () => {
    expect(isUndefined(null)).toBe(false);
  });

  it("returns false for true", () => {
    expect(isUndefined(true)).toBe(false);
  });

  it("returns false for false", () => {
    expect(isUndefined(false)).toBe(false);
  });

  it("returns false for zero", () => {
    expect(isUndefined(0)).toBe(false);
  });

  it("returns false for a number", () => {
    expect(isUndefined(42)).toBe(false);
  });

  it("returns false for NaN", () => {
    expect(isUndefined(NaN)).toBe(false);
  });

  it("returns false for Infinity", () => {
    expect(isUndefined(Infinity)).toBe(false);
  });

  it("returns false for a string", () => {
    expect(isUndefined("undefined")).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(isUndefined("")).toBe(false);
  });

  it("returns false for an object", () => {
    expect(isUndefined({})).toBe(false);
  });

  it("returns false for an array", () => {
    expect(isUndefined([])).toBe(false);
  });

  it("returns false for a function", () => {
    expect(isUndefined(() => {})).toBe(false);
  });

  it("returns false for a Symbol", () => {
    expect(isUndefined(Symbol("test"))).toBe(false);
  });

  it("returns false for a BigInt", () => {
    expect(isUndefined(123n)).toBe(false);
  });

  it("does not mutate the input", () => {
    const value = undefined;

    isUndefined(value);

    expect(value).toBeUndefined();
  });
});
