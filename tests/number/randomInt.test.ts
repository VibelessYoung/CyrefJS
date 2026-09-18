import { describe, expect, it, vi } from "vitest";
import { randomInt } from "../../src/number/randomInt.js";

describe("randomInt", () => {
  it("returns an integer within the inclusive range", () => {
    for (let i = 0; i < 1000; i++) {
      const result = randomInt(1, 10);

      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
    }
  });

  it("includes the minimum value", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    expect(randomInt(1, 10)).toBe(1);

    vi.restoreAllMocks();
  });

  it("can produce the maximum value", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.999999999);

    expect(randomInt(1, 10)).toBe(10);

    vi.restoreAllMocks();
  });

  it("handles zero-based ranges", () => {
    for (let i = 0; i < 100; i++) {
      const result = randomInt(0, 5);

      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(5);
    }
  });

  it("handles negative ranges", () => {
    for (let i = 0; i < 100; i++) {
      const result = randomInt(-10, -1);

      expect(result).toBeGreaterThanOrEqual(-10);
      expect(result).toBeLessThanOrEqual(-1);
    }
  });

  it("handles ranges crossing zero", () => {
    for (let i = 0; i < 100; i++) {
      const result = randomInt(-5, 5);

      expect(result).toBeGreaterThanOrEqual(-5);
      expect(result).toBeLessThanOrEqual(5);
    }
  });

  it("returns the only possible value when min equals max", () => {
    expect(randomInt(5, 5)).toBe(5);
  });

  it("throws when min is greater than max", () => {
    expect(() => randomInt(10, 1)).toThrow(RangeError);
  });

  it("throws when min is not an integer", () => {
    expect(() => randomInt(1.5, 10)).toThrow(RangeError);
  });

  it("throws when max is not an integer", () => {
    expect(() => randomInt(1, 10.5)).toThrow(RangeError);
  });

  it("throws when min is NaN", () => {
    expect(() => randomInt(NaN, 10)).toThrow(RangeError);
  });

  it("throws when max is NaN", () => {
    expect(() => randomInt(1, NaN)).toThrow(RangeError);
  });

  it("throws when min is Infinity", () => {
    expect(() => randomInt(Infinity, 10)).toThrow(RangeError);
  });

  it("throws when max is Infinity", () => {
    expect(() => randomInt(1, Infinity)).toThrow(RangeError);
  });
});
