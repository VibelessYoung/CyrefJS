import { describe, expect, it } from "vitest";
import { ceilTo } from "../../src/number/ceilTo.js";

describe("ceilTo", () => {
  it("ceils to two decimal places", () => {
    expect(ceilTo(3.14159, 2)).toBe(3.15);
  });

  it("ceils when necessary", () => {
    expect(ceilTo(3.141, 2)).toBe(3.15);
  });

  it("keeps an already precise value unchanged", () => {
    expect(ceilTo(3.14, 2)).toBe(3.14);
  });

  it("ceils to one decimal place", () => {
    expect(ceilTo(12.31, 1)).toBe(12.4);
  });

  it("ceils to an integer", () => {
    expect(ceilTo(12.01, 0)).toBe(13);
  });

  it("ceils negative values correctly", () => {
    expect(ceilTo(-3.141, 2)).toBe(-3.14);
  });

  it("ceils negative integers correctly", () => {
    expect(ceilTo(-12.6, 0)).toBe(-12);
  });

  it("supports negative decimals", () => {
    expect(ceilTo(1299, -2)).toBe(1300);
  });

  it("supports negative decimals with negative values", () => {
    expect(ceilTo(-1299, -2)).toBe(-1200);
  });

  it("handles zero", () => {
    expect(ceilTo(0, 3)).toBe(0);
  });

  it("handles negative zero", () => {
    expect(Object.is(ceilTo(-0, 2), -0)).toBe(true);
  });

  it("returns positive infinity unchanged", () => {
    expect(ceilTo(Infinity, 2)).toBe(Infinity);
  });

  it("returns negative infinity unchanged", () => {
    expect(ceilTo(-Infinity, 2)).toBe(-Infinity);
  });

  it("throws when value is NaN", () => {
    expect(() => ceilTo(NaN, 2)).toThrow(RangeError);
  });

  it("throws when decimals is NaN", () => {
    expect(() => ceilTo(3.14, NaN)).toThrow(RangeError);
  });

  it("throws when decimals is fractional", () => {
    expect(() => ceilTo(3.14, 1.5)).toThrow(RangeError);
  });

  it("handles high decimal precision", () => {
    expect(ceilTo(1.23456701, 6)).toBe(1.234568);
  });

  it("does not mutate the input value", () => {
    const value = 3.14159;

    ceilTo(value, 2);

    expect(value).toBe(3.14159);
  });
});
