import { describe, expect, it } from "vitest";
import { isBoolean } from "../../src/type/isBoolean.js";

describe("isBoolean", () => {
  it("returns true for true", () => {
    expect(isBoolean(true)).toBe(true);
  });

  it("returns true for false", () => {
    expect(isBoolean(false)).toBe(true);
  });

  it("returns false for a number", () => {
    expect(isBoolean(42)).toBe(false);
  });

  it("returns false for zero", () => {
    expect(isBoolean(0)).toBe(false);
  });

  it("returns false for one", () => {
    expect(isBoolean(1)).toBe(false);
  });

  it("returns false for NaN", () => {
    expect(isBoolean(NaN)).toBe(false);
  });

  it("returns false for Infinity", () => {
    expect(isBoolean(Infinity)).toBe(false);
  });

  it("returns false for a string", () => {
    expect(isBoolean("true")).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(isBoolean("")).toBe(false);
  });

  it("returns false for null", () => {
    expect(isBoolean(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isBoolean(undefined)).toBe(false);
  });

  it("returns false for an object", () => {
    expect(isBoolean({})).toBe(false);
  });

  it("returns false for an array", () => {
    expect(isBoolean([])).toBe(false);
  });

  it("returns false for a function", () => {
    expect(isBoolean(() => {})).toBe(false);
  });

  it("returns false for a Symbol", () => {
    expect(isBoolean(Symbol("test"))).toBe(false);
  });

  it("returns false for a BigInt", () => {
    expect(isBoolean(123n)).toBe(false);
  });

  it("returns false for a Boolean object", () => {
    expect(isBoolean(new Boolean(true))).toBe(false);
  });

  it("does not mutate the input", () => {
    const value = true;

    isBoolean(value);

    expect(value).toBe(true);
  });
});
