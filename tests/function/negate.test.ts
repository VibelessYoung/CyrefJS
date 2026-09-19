import { describe, expect, it, vi } from "vitest";
import { negate } from "../../src/function/negate.js";

describe("negate", () => {
  it("negates a true result to false", () => {
    const fn = () => true;
    const negated = negate(fn);

    expect(negated()).toBe(false);
  });

  it("negates a false result to true", () => {
    const fn = () => false;
    const negated = negate(fn);

    expect(negated()).toBe(true);
  });

  it("passes arguments to the original function", () => {
    const fn = vi.fn((value: number) => value > 10);
    const negated = negate(fn);

    expect(negated(5)).toBe(true);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(5);
  });

  it("works with multiple arguments", () => {
    const fn = (a: number, b: number) => a > b;
    const negated = negate(fn);

    expect(negated(5, 10)).toBe(true);
    expect(negated(10, 5)).toBe(false);
  });

  it("negates every call independently", () => {
    const fn = (value: number) => value % 2 === 0;
    const negated = negate(fn);

    expect(negated(2)).toBe(false);
    expect(negated(3)).toBe(true);
    expect(negated(4)).toBe(false);
    expect(negated(5)).toBe(true);
  });

  it("preserves the original function behavior except for the result", () => {
    const fn = vi.fn((value: string) => value.startsWith("A"));
    const negated = negate(fn);

    expect(negated("Amir")).toBe(false);
    expect(negated("John")).toBe(true);

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenNthCalledWith(1, "Amir");
    expect(fn).toHaveBeenNthCalledWith(2, "John");
  });

  it("works with functions that always return true", () => {
    const negated = negate(() => true);

    expect(negated()).toBe(false);
    expect(negated()).toBe(false);
  });

  it("works with functions that always return false", () => {
    const negated = negate(() => false);

    expect(negated()).toBe(true);
    expect(negated()).toBe(true);
  });

  it("does not cache the result", () => {
    let value = false;

    const fn = () => value;
    const negated = negate(fn);

    expect(negated()).toBe(true);

    value = true;

    expect(negated()).toBe(false);
  });
});
