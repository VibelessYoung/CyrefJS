import { describe, expect, it } from "vitest";
import { roundTo } from "../../src/number/roundTo.js";

describe("roundTo", () => {
  it("rounds to two decimal places", () => {
    expect(roundTo(3.14159, 2)).toBe(3.14);
  });

  it("rounds up when necessary", () => {
    expect(roundTo(3.146, 2)).toBe(3.15);
  });

  it("rounds down when necessary", () => {
    expect(roundTo(3.144, 2)).toBe(3.14);
  });

  it("rounds to one decimal place", () => {
    expect(roundTo(12.36, 1)).toBe(12.4);
  });

  it("rounds to an integer", () => {
    expect(roundTo(12.6, 0)).toBe(13);
  });

  it("handles values that do not need rounding", () => {
    expect(roundTo(10.25, 2)).toBe(10.25);
  });

  it("handles negative values", () => {
    expect(roundTo(-3.14159, 2)).toBe(-3.14);
  });

  it("handles negative decimals", () => {
    expect(roundTo(1234, -2)).toBe(1200);
  });

  it("handles negative decimals for larger values", () => {
    expect(roundTo(12345, -3)).toBe(12000);
  });

  it("handles negative decimals with rounding", () => {
    expect(roundTo(1250, -2)).toBe(1300);
  });

  it("handles zero", () => {
    expect(roundTo(0, 3)).toBe(0);
  });

  it("handles negative zero", () => {
    expect(Object.is(roundTo(-0, 2), -0)).toBe(true);
  });

  it("returns positive infinity unchanged", () => {
    expect(roundTo(Infinity, 2)).toBe(Infinity);
  });

  it("returns negative infinity unchanged", () => {
    expect(roundTo(-Infinity, 2)).toBe(-Infinity);
  });

  it("throws when value is NaN", () => {
    expect(() => roundTo(NaN, 2)).toThrow(RangeError);
  });

  it("throws when decimals is NaN", () => {
    expect(() => roundTo(3.14, NaN)).toThrow(RangeError);
  });

  it("throws when decimals is fractional", () => {
    expect(() => roundTo(3.14, 1.5)).toThrow(RangeError);
  });

  it("handles large decimal precision", () => {
    expect(roundTo(1.23456789, 6)).toBe(1.234568);
  });

  it("does not mutate the input value", () => {
    const value = 3.14159;

    roundTo(value, 2);

    expect(value).toBe(3.14159);
  });
});
