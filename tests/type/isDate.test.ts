import { describe, expect, it } from "vitest";
import { isDate } from "../../src/type/isDate.js";

describe("isDate", () => {
  it("returns true for a Date instance", () => {
    expect(isDate(new Date())).toBe(true);
  });

  it("returns true for a Date created from a timestamp", () => {
    expect(isDate(new Date(0))).toBe(true);
  });

  it("returns true for a Date created from a date string", () => {
    expect(isDate(new Date("2026-09-19"))).toBe(true);
  });

  it("returns true for an invalid Date object", () => {
    expect(isDate(new Date("invalid"))).toBe(true);
  });

  it("returns true for a Date with a negative timestamp", () => {
    expect(isDate(new Date(-1))).toBe(true);
  });

  it("returns false for a date string", () => {
    expect(isDate("2026-09-19")).toBe(false);
  });

  it("returns false for an ISO date string", () => {
    expect(isDate("2026-09-19T12:00:00.000Z")).toBe(false);
  });

  it("returns false for a timestamp", () => {
    expect(isDate(Date.now())).toBe(false);
  });

  it("returns false for a number", () => {
    expect(isDate(42)).toBe(false);
  });

  it("returns false for zero", () => {
    expect(isDate(0)).toBe(false);
  });

  it("returns false for null", () => {
    expect(isDate(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isDate(undefined)).toBe(false);
  });

  it("returns false for an object", () => {
    expect(isDate({})).toBe(false);
  });

  it("returns false for an array", () => {
    expect(isDate([])).toBe(false);
  });

  it("returns false for a function", () => {
    expect(isDate(() => {})).toBe(false);
  });

  it("returns false for a RegExp", () => {
    expect(isDate(/test/)).toBe(false);
  });

  it("returns false for a Map", () => {
    expect(isDate(new Map())).toBe(false);
  });

  it("returns false for a Set", () => {
    expect(isDate(new Set())).toBe(false);
  });

  it("returns false for a Boolean object", () => {
    expect(isDate(new Boolean(true))).toBe(false);
  });

  it("returns false for a Number object", () => {
    expect(isDate(new Number(42))).toBe(false);
  });

  it("returns false for a String object", () => {
    expect(isDate(new String("hello"))).toBe(false);
  });

  it("does not mutate the input", () => {
    const value = new Date("2026-09-19");

    isDate(value);

    expect(value).toEqual(new Date("2026-09-19"));
  });
});
