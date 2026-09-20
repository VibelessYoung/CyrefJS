import { describe, expect, it } from "vitest";
import { differenceInDays } from "../../src/date/differenceInDays.js";

describe("differenceInDays", () => {
  it("returns the number of days between two dates", () => {
    const left = new Date(2026, 8, 25);
    const right = new Date(2026, 8, 20);

    expect(differenceInDays(left, right)).toBe(5);
  });

  it("returns a negative value when the left date is earlier", () => {
    const left = new Date(2026, 8, 20);
    const right = new Date(2026, 8, 25);

    expect(differenceInDays(left, right)).toBe(-5);
  });

  it("returns zero for the same date", () => {
    const left = new Date(2026, 8, 20);
    const right = new Date(2026, 8, 20);

    expect(differenceInDays(left, right)).toBe(0);
  });

  it("ignores the time of day", () => {
    const left = new Date(2026, 8, 25, 23, 59, 59);
    const right = new Date(2026, 8, 20, 0, 0, 1);

    expect(differenceInDays(left, right)).toBe(5);
  });

  it("handles crossing the end of a month", () => {
    const left = new Date(2026, 9, 1);
    const right = new Date(2026, 8, 30);

    expect(differenceInDays(left, right)).toBe(1);
  });

  it("handles crossing the end of a year", () => {
    const left = new Date(2027, 0, 1);
    const right = new Date(2026, 11, 31);

    expect(differenceInDays(left, right)).toBe(1);
  });

  it("handles leap years", () => {
    const left = new Date(2024, 2, 1);
    const right = new Date(2024, 1, 28);

    expect(differenceInDays(left, right)).toBe(2);
  });

  it("handles dates several years apart", () => {
    const left = new Date(2030, 0, 1);
    const right = new Date(2026, 0, 1);

    expect(differenceInDays(left, right)).toBe(1461);
  });

  it("does not mutate the input dates", () => {
    const left = new Date(2026, 8, 25, 15, 30);
    const right = new Date(2026, 8, 20, 10, 45);

    const leftTime = left.getTime();
    const rightTime = right.getTime();

    differenceInDays(left, right);

    expect(left.getTime()).toBe(leftTime);
    expect(right.getTime()).toBe(rightTime);
  });

  it("returns the absolute calendar difference when dates are reversed only if caller reverses the sign", () => {
    const left = new Date(2026, 8, 20);
    const right = new Date(2026, 8, 25);

    expect(differenceInDays(right, left)).toBe(5);
    expect(differenceInDays(left, right)).toBe(-5);
  });
});
