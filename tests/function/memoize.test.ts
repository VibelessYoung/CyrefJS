import { describe, expect, it, vi } from "vitest";
import { memoize } from "../../src/function/memoize.js";

describe("memoize", () => {
  it("caches the result for the same argument", () => {
    const fn = vi.fn((value: number) => value * 2);
    const memoized = memoize(fn);

    expect(memoized(5)).toBe(10);
    expect(memoized(5)).toBe(10);
    expect(memoized(5)).toBe(10);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("executes the function again for different arguments", () => {
    const fn = vi.fn((value: number) => value * 2);
    const memoized = memoize(fn);

    expect(memoized(5)).toBe(10);
    expect(memoized(10)).toBe(20);
    expect(memoized(5)).toBe(10);

    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenNthCalledWith(1, 5);
    expect(fn).toHaveBeenNthCalledWith(2, 10);
  });

  it("supports multiple arguments", () => {
    const fn = vi.fn((a: number, b: number) => a + b);

    const memoized = memoize(fn);

    expect(memoized(10, 20)).toBe(30);
    expect(memoized(10, 20)).toBe(30);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("treats different argument combinations as different cache entries", () => {
    const fn = vi.fn((a: number, b: number) => a + b);

    const memoized = memoize(fn);

    expect(memoized(1, 2)).toBe(3);
    expect(memoized(2, 1)).toBe(3);

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("preserves the first cached result", () => {
    let counter = 0;

    const fn = () => {
      counter += 1;
      return counter;
    };

    const memoized = memoize(fn);

    expect(memoized()).toBe(1);
    expect(memoized()).toBe(1);
    expect(memoized()).toBe(1);

    expect(counter).toBe(1);
  });

  it("caches undefined results", () => {
    const fn = vi.fn(() => undefined);
    const memoized = memoize(fn);

    expect(memoized()).toBeUndefined();
    expect(memoized()).toBeUndefined();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("caches null results", () => {
    const fn = vi.fn(() => null);
    const memoized = memoize(fn);

    expect(memoized()).toBeNull();
    expect(memoized()).toBeNull();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("caches object references", () => {
    const value = { name: "Amir" };

    const fn = vi.fn(() => value);
    const memoized = memoize(fn);

    const first = memoized();
    const second = memoized();

    expect(first).toBe(value);
    expect(second).toBe(value);
    expect(first).toBe(second);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("supports a custom resolver", () => {
    const fn = vi.fn((id: number, name: string) => `${id}:${name}`);

    const memoized = memoize(fn, (id) => id);

    expect(memoized(1, "Amir")).toBe("1:Amir");
    expect(memoized(1, "Ali")).toBe("1:Amir");

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("uses the resolver to determine cache identity", () => {
    const fn = vi.fn((value: number) => value * 2);

    const resolver = vi.fn((value: number) => String(value));

    const memoized = memoize(fn, resolver);

    expect(memoized(5)).toBe(10);
    expect(memoized(5)).toBe(10);

    expect(resolver).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("does not execute the function until it is called", () => {
    const fn = vi.fn(() => 42);

    memoize(fn);

    expect(fn).not.toHaveBeenCalled();
  });
});
