import { describe, expect, it } from "vitest";
import { percentage } from "../../src/number/percentage.js";

describe("percentage", () => {
  it("calculates a percentage of a value", () => {
    expect(percentage(200, 10)).toBe(20);
  });

  it("calculates 25 percent", () => {
    expect(percentage(500, 25)).toBe(125);
  });

  it("calculates 50 percent", () => {
    expect(percentage(80, 50)).toBe(40);
  });

  it("calculates 100 percent", () => {
    expect(percentage(250, 100)).toBe(250);
  });

  it("calculates 0 percent", () => {
    expect(percentage(250, 0)).toBe(0);
  });

  it("handles decimal percentages", () => {
    expect(percentage(200, 12.5)).toBe(25);
  });

  it("handles decimal values", () => {
    expect(percentage(12.5, 20)).toBe(2.5);
  });

  it("handles negative values", () => {
    expect(percentage(-200, 10)).toBe(-20);
  });

  it("handles negative percentages", () => {
    expect(percentage(200, -10)).toBe(-20);
  });

  it("allows percentages greater than 100", () => {
    expect(percentage(200, 150)).toBe(300);
  });

  it("handles zero value", () => {
    expect(percentage(0, 50)).toBe(0);
  });

  it("handles positive infinity", () => {
    expect(percentage(Infinity, 10)).toBe(Infinity);
  });

  it("handles negative infinity", () => {
    expect(percentage(-Infinity, 10)).toBe(-Infinity);
  });

  it("throws when value is NaN", () => {
    expect(() => percentage(NaN, 10)).toThrow(RangeError);
  });

  it("throws when percent is NaN", () => {
    expect(() => percentage(100, NaN)).toThrow(RangeError);
  });

  it("does not mutate the input value", () => {
    const value = 200;
    const percent = 10;

    percentage(value, percent);

    expect(value).toBe(200);
    expect(percent).toBe(10);
  });
});
