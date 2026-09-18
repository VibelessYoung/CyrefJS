import { describe, expect, it } from "vitest";
import { floorTo } from "../../src/number/floorTo.js";

describe("floorTo", () => {
  it("floors to two decimal places", () => {
    expect(floorTo(3.14159, 2)).toBe(3.14);
  });

  it("does not round up", () => {
    expect(floorTo(3.149, 2)).toBe(3.14);
  });

  it("keeps an already precise value unchanged", () => {
    expect(floorTo(3.14, 2)).toBe(3.14);
  });

  it("floors to one decimal place", () => {
    expect(floorTo(12.39, 1)).toBe(12.3);
  });

  it("floors to an integer", () => {
    expect(floorTo(12.99, 0)).toBe(12);
  });

  it("floors negative values correctly", () => {
    expect(floorTo(-3.141, 2)).toBe(-3.15);
  });

  it("floors negative integers correctly", () => {
    expect(floorTo(-12.6, 0)).toBe(-13);
  });

  it("supports negative decimals", () => {
    expect(floorTo(1299, -2)).toBe(1200);
  });

  it("supports negative decimals with negative values", () => {
    expect(floorTo(-1299, -2)).toBe(-1300);
  });

  it("handles zero", () => {
    expect(floorTo(0, 3)).toBe(0);
  });

  it("handles negative zero", () => {
    expect(Object.is(floorTo(-0, 2), -0)).toBe(true);
  });

  it("returns positive infinity unchanged", () => {
    expect(floorTo(Infinity, 2)).toBe(Infinity);
  });

  it("returns negative infinity unchanged", () => {
    expect(floorTo(-Infinity, 2)).toBe(-Infinity);
  });

  it("throws when value is NaN", () => {
    expect(() => floorTo(NaN, 2)).toThrow(RangeError);
  });

  it("throws when decimals is NaN", () => {
    expect(() => floorTo(3.14, NaN)).toThrow(RangeError);
  });

  it("throws when decimals is fractional", () => {
    expect(() => floorTo(3.14, 1.5)).toThrow(RangeError);
  });

  it("handles high decimal precision", () => {
    expect(floorTo(1.23456789, 6)).toBe(1.234567);
  });

  it("does not mutate the input value", () => {
    const value = 3.14159;

    floorTo(value, 2);

    expect(value).toBe(3.14159);
  });
});
