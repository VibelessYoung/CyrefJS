import { describe, expect, it } from "vitest";
import { isAfter } from "../../src/date/isAfter.js";

describe("isAfter", () => {
  it("returns true when the first date is after the second date", () => {
    const left = new Date(2026, 8, 25);
    const right = new Date(2026, 8, 20);

    expect(isAfter(left, right)).toBe(true);
  });

  it("returns false when the first date is before the second date", () => {
    const left = new Date(2026, 8, 20);
    const right = new Date(2026, 8, 25);

    expect(isAfter(left, right)).toBe(false);
  });

  it("returns false when both dates are equal", () => {
    const left = new Date(2026, 8, 20);
    const right = new Date(2026, 8, 20);

    expect(isAfter(left, right)).toBe(false);
  });

  it("compares the time when dates are on the same day", () => {
    const left = new Date(2026, 8, 20, 12, 0);
    const right = new Date(2026, 8, 20, 10, 0);

    expect(isAfter(left, right)).toBe(true);
  });

  it("returns false when the first time is earlier on the same day", () => {
    const left = new Date(2026, 8, 20, 10, 0);
    const right = new Date(2026, 8, 20, 12, 0);

    expect(isAfter(left, right)).toBe(false);
  });

  it("handles dates across different months", () => {
    const left = new Date(2026, 9, 1);
    const right = new Date(2026, 8, 30);

    expect(isAfter(left, right)).toBe(true);
  });

  it("handles dates across different years", () => {
    const left = new Date(2027, 0, 1);
    const right = new Date(2026, 11, 31);

    expect(isAfter(left, right)).toBe(true);
  });

  it("handles the Unix epoch", () => {
    const epoch = new Date(0);
    const later = new Date(1);

    expect(isAfter(later, epoch)).toBe(true);
  });

  it("does not mutate either date", () => {
    const left = new Date(2026, 8, 25, 15, 45);
    const right = new Date(2026, 8, 20, 10, 30);

    const leftTime = left.getTime();
    const rightTime = right.getTime();

    isAfter(left, right);

    expect(left.getTime()).toBe(leftTime);
    expect(right.getTime()).toBe(rightTime);
  });
});
