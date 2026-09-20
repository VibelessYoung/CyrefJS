import { describe, expect, it } from "vitest";
import { endOfDay } from "../../src/date/endOfDay.js";

describe("endOfDay", () => {
  it("sets the time to the end of the day", () => {
    const date = new Date(2026, 8, 20, 15, 30, 45, 123);

    const result = endOfDay(date);

    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
  });

  it("preserves the year, month, and day", () => {
    const date = new Date(2026, 8, 20, 15, 30, 45);

    const result = endOfDay(date);

    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(8);
    expect(result.getDate()).toBe(20);
  });

  it("does not mutate the original Date", () => {
    const date = new Date(2026, 8, 20, 15, 30, 45, 123);
    const originalTime = date.getTime();

    endOfDay(date);

    expect(date.getTime()).toBe(originalTime);
  });

  it("returns a new Date instance", () => {
    const date = new Date(2026, 8, 20, 15, 30, 45);

    const result = endOfDay(date);

    expect(result).not.toBe(date);
    expect(result).toBeInstanceOf(Date);
  });

  it("works when the date is already at the end of the day", () => {
    const date = new Date(2026, 8, 20, 23, 59, 59, 999);

    const result = endOfDay(date);

    expect(result.getTime()).toBe(date.getTime());
    expect(result).not.toBe(date);
  });

  it("works when the date is at the start of the day", () => {
    const date = new Date(2026, 8, 20, 0, 0, 0, 0);

    const result = endOfDay(date);

    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
    expect(result.getMilliseconds()).toBe(999);
  });

  it("preserves the local date", () => {
    const date = new Date(2026, 8, 20, 23, 59, 59);

    const result = endOfDay(date);

    expect(result.getFullYear()).toBe(date.getFullYear());
    expect(result.getMonth()).toBe(date.getMonth());
    expect(result.getDate()).toBe(date.getDate());
  });
});
