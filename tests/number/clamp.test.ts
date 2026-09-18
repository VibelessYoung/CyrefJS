import { describe, expect, it } from "vitest";
import { clamp } from "../../src/number/clamp.js";

describe("clamp", () => {
  it("returns the value when it is inside the range", () => {
    expect(clamp(50, 0, 100)).toBe(50);
  });

  it("returns min when value is below the range", () => {
    expect(clamp(-20, 0, 100)).toBe(0);
  });

  it("returns max when value is above the range", () => {
    expect(clamp(150, 0, 100)).toBe(100);
  });

  it("returns min when value equals min", () => {
    expect(clamp(0, 0, 100)).toBe(0);
  });

  it("returns max when value equals max", () => {
    expect(clamp(100, 0, 100)).toBe(100);
  });

  it("handles min equal to max", () => {
    expect(clamp(20, 50, 50)).toBe(50);
  });

  it("handles negative ranges", () => {
    expect(clamp(-5, -10, -1)).toBe(-5);
  });

  it("clamps below a negative range", () => {
    expect(clamp(-20, -10, -1)).toBe(-10);
  });

  it("clamps above a negative range", () => {
    expect(clamp(0, -10, -1)).toBe(-1);
  });

  it("handles decimal values", () => {
    expect(clamp(5.75, 0.5, 10.5)).toBe(5.75);
  });

  it("handles decimal boundaries", () => {
    expect(clamp(0.25, 0.5, 10.5)).toBe(0.5);
  });

  it("handles positive infinity", () => {
    expect(clamp(Infinity, 0, 100)).toBe(100);
  });

  it("handles negative infinity", () => {
    expect(clamp(-Infinity, 0, 100)).toBe(0);
  });

  it("allows infinite bounds", () => {
    expect(clamp(50, -Infinity, Infinity)).toBe(50);
  });

  it("throws when value is NaN", () => {
    expect(() => clamp(NaN, 0, 100)).toThrow(RangeError);
  });

  it("throws when min is NaN", () => {
    expect(() => clamp(50, NaN, 100)).toThrow(RangeError);
  });

  it("throws when max is NaN", () => {
    expect(() => clamp(50, 0, NaN)).toThrow(RangeError);
  });

  it("throws when min is greater than max", () => {
    expect(() => clamp(50, 100, 0)).toThrow(RangeError);
  });

  it("does not mutate the input value", () => {
    const value = 50;

    clamp(value, 0, 100);

    expect(value).toBe(50);
  });
});
