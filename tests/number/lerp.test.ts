import { describe, expect, it } from "vitest";
import { lerp } from "../../src/number/lerp.js";

describe("lerp", () => {
  it("returns start when t is 0", () => {
    expect(lerp(10, 20, 0)).toBe(10);
  });

  it("returns end when t is 1", () => {
    expect(lerp(10, 20, 1)).toBe(20);
  });

  it("returns the midpoint when t is 0.5", () => {
    expect(lerp(10, 20, 0.5)).toBe(15);
  });

  it("interpolates a quarter of the way", () => {
    expect(lerp(10, 20, 0.25)).toBe(12.5);
  });

  it("interpolates three quarters of the way", () => {
    expect(lerp(10, 20, 0.75)).toBe(17.5);
  });

  it("works when start is greater than end", () => {
    expect(lerp(20, 10, 0.5)).toBe(15);
  });

  it("works with negative numbers", () => {
    expect(lerp(-10, 10, 0.5)).toBe(0);
  });

  it("works when both values are negative", () => {
    expect(lerp(-20, -10, 0.5)).toBe(-15);
  });

  it("works with decimal values", () => {
    expect(lerp(1.5, 4.5, 0.5)).toBe(3);
  });

  it("returns the same value when start and end are equal", () => {
    expect(lerp(42, 42, 0.75)).toBe(42);
  });

  it("supports t values greater than 1", () => {
    expect(lerp(10, 20, 2)).toBe(30);
  });

  it("supports negative t values", () => {
    expect(lerp(10, 20, -1)).toBe(0);
  });

  it("handles t greater than 1 with negative values", () => {
    expect(lerp(-10, 10, 2)).toBe(30);
  });

  it("handles t equal to 0.25 correctly with a negative range", () => {
    expect(lerp(-20, 20, 0.25)).toBe(-10);
  });

  it("handles positive infinity", () => {
    expect(lerp(10, Infinity, 0.5)).toBe(Infinity);
  });

  it("returns NaN when interpolation causes infinity subtraction", () => {
    expect(lerp(-Infinity, 10, 0.5)).toBeNaN();
  });

  it("throws when start is NaN", () => {
    expect(() => lerp(NaN, 10, 0.5)).toThrow(RangeError);
  });

  it("throws when end is NaN", () => {
    expect(() => lerp(10, NaN, 0.5)).toThrow(RangeError);
  });

  it("throws when t is NaN", () => {
    expect(() => lerp(10, 20, NaN)).toThrow(RangeError);
  });

  it("does not mutate the input values", () => {
    const start = 10;
    const end = 20;
    const t = 0.5;

    lerp(start, end, t);

    expect(start).toBe(10);
    expect(end).toBe(20);
    expect(t).toBe(0.5);
  });
});
