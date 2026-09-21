import { describe, expect, it } from "vitest";
import { isPositive } from "../../src/validation/isPositive";

describe("isPositive", () => {
  it("should return true for positive integers", () => {
    expect(isPositive(1)).toBe(true);
    expect(isPositive(42)).toBe(true);
    expect(isPositive(1000)).toBe(true);
  });

  it("should return true for positive decimals", () => {
    expect(isPositive(0.1)).toBe(true);
    expect(isPositive(1.5)).toBe(true);
    expect(isPositive(3.14)).toBe(true);
  });

  it("should return false for zero", () => {
    expect(isPositive(0)).toBe(false);
    expect(isPositive(-0)).toBe(false);
  });

  it("should return false for negative numbers", () => {
    expect(isPositive(-1)).toBe(false);
    expect(isPositive(-42)).toBe(false);
    expect(isPositive(-0.5)).toBe(false);
  });

  it("should return false for NaN", () => {
    expect(isPositive(NaN)).toBe(false);
  });

  it("should return true for positive infinity", () => {
    expect(isPositive(Infinity)).toBe(true);
  });

  it("should return false for negative infinity", () => {
    expect(isPositive(-Infinity)).toBe(false);
  });

  it("should reject numeric strings", () => {
    expect(isPositive("1")).toBe(false);
    expect(isPositive("3.14")).toBe(false);
  });

  it("should reject booleans", () => {
    expect(isPositive(true)).toBe(false);
    expect(isPositive(false)).toBe(false);
  });

  it("should reject null and undefined", () => {
    expect(isPositive(null)).toBe(false);
    expect(isPositive(undefined)).toBe(false);
  });

  it("should reject objects and arrays", () => {
    expect(isPositive({})).toBe(false);
    expect(isPositive([])).toBe(false);
  });

  it("should reject boxed numbers", () => {
    expect(isPositive(new Number(10))).toBe(false);
  });
});
