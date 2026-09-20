import { describe, expect, it } from "vitest";
import { isValidDate } from "../../src/date/isValidDate.js";

describe("isValidDate", () => {
  it("returns true for a valid Date", () => {
    expect(isValidDate(new Date())).toBe(true);
  });

  it("returns true for a valid date created from a string", () => {
    expect(isValidDate(new Date("2026-01-01"))).toBe(true);
  });

  it("returns true for a valid date created from a timestamp", () => {
    expect(isValidDate(new Date(0))).toBe(true);
  });

  it("returns true for the Unix epoch", () => {
    expect(isValidDate(new Date(0))).toBe(true);
  });

  it("returns false for an invalid Date", () => {
    expect(isValidDate(new Date("invalid"))).toBe(false);
  });

  it("returns false for Date created from NaN", () => {
    expect(isValidDate(new Date(NaN))).toBe(false);
  });

  it("returns false for a date string", () => {
    expect(isValidDate("2026-01-01")).toBe(false);
  });

  it("returns false for a timestamp", () => {
    expect(isValidDate(Date.now())).toBe(false);
  });

  it("returns false for null", () => {
    expect(isValidDate(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isValidDate(undefined)).toBe(false);
  });

  it("returns false for an object", () => {
    expect(isValidDate({})).toBe(false);
  });

  it("returns false for an array", () => {
    expect(isValidDate([])).toBe(false);
  });

  it("returns false for a number object", () => {
    expect(isValidDate(new Number(2026))).toBe(false);
  });
});
