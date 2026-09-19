import { describe, expect, it, vi } from "vitest";
import { once } from "../../src/function/once.js";

describe("once", () => {
  it("executes the function only once", () => {
    const fn = vi.fn(() => 42);
    const wrapped = once(fn);

    wrapped();
    wrapped();
    wrapped();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("returns the result of the first execution", () => {
    const fn = vi.fn(() => 42);
    const wrapped = once(fn);

    expect(wrapped()).toBe(42);
  });

  it("returns the same result for subsequent calls", () => {
    const fn = vi.fn(() => Math.random());
    const wrapped = once(fn);

    const first = wrapped();
    const second = wrapped();
    const third = wrapped();

    expect(second).toBe(first);
    expect(third).toBe(first);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("passes arguments to the original function", () => {
    const fn = vi.fn((a: number, b: number) => a + b);
    const wrapped = once(fn);

    expect(wrapped(10, 20)).toBe(30);

    expect(fn).toHaveBeenCalledWith(10, 20);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("ignores arguments from subsequent calls", () => {
    const fn = vi.fn((value: number) => value * 2);
    const wrapped = once(fn);

    expect(wrapped(10)).toBe(20);
    expect(wrapped(100)).toBe(20);
    expect(wrapped(500)).toBe(20);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(10);
  });

  it("works with functions that return undefined", () => {
    const fn = vi.fn(() => undefined);
    const wrapped = once(fn);

    expect(wrapped()).toBeUndefined();
    expect(wrapped()).toBeUndefined();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("works with functions that return null", () => {
    const fn = vi.fn(() => null);
    const wrapped = once(fn);

    expect(wrapped()).toBeNull();
    expect(wrapped()).toBeNull();

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("works with functions that return objects", () => {
    const value = { name: "Amir" };
    const fn = vi.fn(() => value);
    const wrapped = once(fn);

    const first = wrapped();
    const second = wrapped();

    expect(first).toBe(value);
    expect(second).toBe(value);
    expect(first).toBe(second);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("preserves the original function result even when arguments change", () => {
    const fn = vi.fn((value: string) => value.toUpperCase());
    const wrapped = once(fn);

    expect(wrapped("hello")).toBe("HELLO");
    expect(wrapped("world")).toBe("HELLO");

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("supports functions with no arguments", () => {
    const fn = vi.fn(() => "done");
    const wrapped = once(fn);

    expect(wrapped()).toBe("done");
    expect(wrapped()).toBe("done");

    expect(fn).toHaveBeenCalledTimes(1);
  });
});
