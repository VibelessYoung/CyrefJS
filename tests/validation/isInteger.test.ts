import { describe, expect, it } from "vitest";
import { isInteger } from "../../src/validation/isInteger";

describe("isInteger", () => {
  it("should return true for positive integers", () => {
    expect(isInteger(1)).toBe(true);
    expect(isInteger(42)).toBe(true);
    expect(isInteger(1000)).toBe(true);
  });

  it("should return true for negative integers", () => {
    expect(isInteger(-1)).toBe(true);
    expect(isInteger(-42)).toBe(true);
    expect(isInteger(-1000)).toBe(true);
  });

  it("should return true for zero", () => {
    expect(isInteger(0)).toBe(true);
  });

  it("should return true for negative zero", () => {
    expect(isInteger(-0)).toBe(true);
  });

  it("should return true for large safe integers", () => {
    expect(isInteger(Number.MAX_SAFE_INTEGER)).toBe(true);

    expect(isInteger(Number.MIN_SAFE_INTEGER)).toBe(true);
  });

  it("should return true for integers outside the safe integer range", () => {
    expect(isInteger(Number.MAX_SAFE_INTEGER + 1)).toBe(true);
  });

  it("should reject floating-point numbers", () => {
    expect(isInteger(1.5)).toBe(false);
    expect(isInteger(3.14)).toBe(false);
    expect(isInteger(-2.5)).toBe(false);
  });

  it("should reject NaN", () => {
    expect(isInteger(NaN)).toBe(false);
  });

  it("should reject positive infinity", () => {
    expect(isInteger(Infinity)).toBe(false);
  });

  it("should reject negative infinity", () => {
    expect(isInteger(-Infinity)).toBe(false);
  });

  it("should reject numeric strings", () => {
    expect(isInteger("42")).toBe(false);
    expect(isInteger("1")).toBe(false);
  });

  it("should reject booleans", () => {
    expect(isInteger(true)).toBe(false);
    expect(isInteger(false)).toBe(false);
  });

  it("should reject null and undefined", () => {
    expect(isInteger(null)).toBe(false);
    expect(isInteger(undefined)).toBe(false);
  });

  it("should reject objects and arrays", () => {
    expect(isInteger({})).toBe(false);
    expect(isInteger([])).toBe(false);
  });

  it("should reject boxed numbers", () => {
    expect(isInteger(new Number(42))).toBe(false);
  });
});
