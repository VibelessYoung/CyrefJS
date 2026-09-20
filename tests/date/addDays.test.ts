import { describe, expect, it } from "vitest";
import { addDays } from "../../src/date/addDays.js";

describe("addDays", () => {
  it("adds the specified number of days", () => {
    const date = new Date(2026, 8, 20);

    const result = addDays(date, 5);

    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(8);
    expect(result.getDate()).toBe(25);
  });

  it("subtracts days when the amount is negative", () => {
    const date = new Date(2026, 8, 20);

    const result = addDays(date, -5);

    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(8);
    expect(result.getDate()).toBe(15);
  });

  it("returns a new Date instance", () => {
    const date = new Date(2026, 8, 20);

    const result = addDays(date, 5);

    expect(result).not.toBe(date);
    expect(result).toBeInstanceOf(Date);
  });

  it("does not mutate the original Date", () => {
    const date = new Date(2026, 8, 20, 15, 30, 45, 123);
    const originalTime = date.getTime();

    addDays(date, 5);

    expect(date.getTime()).toBe(originalTime);
  });

  it("preserves the time of day", () => {
    const date = new Date(2026, 8, 20, 15, 30, 45, 123);

    const result = addDays(date, 5);

    expect(result.getHours()).toBe(15);
    expect(result.getMinutes()).toBe(30);
    expect(result.getSeconds()).toBe(45);
    expect(result.getMilliseconds()).toBe(123);
  });

  it("handles crossing the end of a month", () => {
    const date = new Date(2026, 0, 31);

    const result = addDays(date, 1);

    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(1);
    expect(result.getDate()).toBe(1);
  });

  it("handles crossing the end of a year", () => {
    const date = new Date(2026, 11, 31);

    const result = addDays(date, 1);

    expect(result.getFullYear()).toBe(2027);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(1);
  });

  it("handles subtracting across the beginning of a month", () => {
    const date = new Date(2026, 1, 1);

    const result = addDays(date, -1);

    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(31);
  });

  it("returns an equivalent date when amount is zero", () => {
    const date = new Date(2026, 8, 20, 15, 30, 45, 123);

    const result = addDays(date, 0);

    expect(result.getTime()).toBe(date.getTime());
    expect(result).not.toBe(date);
  });

  it("supports adding multiple weeks", () => {
    const date = new Date(2026, 8, 20);

    const result = addDays(date, 14);

    expect(result.getDate()).toBe(4);
    expect(result.getMonth()).toBe(9);
  });
});
