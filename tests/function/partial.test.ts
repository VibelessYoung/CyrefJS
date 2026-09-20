import { describe, expect, it, vi } from "vitest";
import { partial } from "../../src/function/partial.js";

describe("partial", () => {
  it("pre-applies arguments to a function", () => {
    const add = (a: number, b: number) => a + b;

    const addTen = partial(add, 10);

    expect(addTen(5)).toBe(15);
  });

  it("supports multiple pre-applied arguments", () => {
    const add = (a: number, b: number, c: number) => a + b + c;

    const addTenAndTwenty = partial(add, 10, 20);

    expect(addTenAndTwenty(30)).toBe(60);
  });

  it("preserves argument order", () => {
    const fn = (a: string, b: string, c: string) => `${a}-${b}-${c}`;

    const partiallyApplied = partial(fn, "A", "B");

    expect(partiallyApplied("C")).toBe("A-B-C");
  });

  it("supports multiple remaining arguments", () => {
    const sum = (a: number, b: number, c: number, d: number) => a + b + c + d;

    const partiallyApplied = partial(sum, 1, 2);

    expect(partiallyApplied(3, 4)).toBe(10);
  });

  it("supports partial application with no pre-applied arguments", () => {
    const add = (a: number, b: number) => a + b;

    const partiallyApplied = partial(add);

    expect(partiallyApplied(10, 20)).toBe(30);
  });

  it("does not execute the original function immediately", () => {
    const fn = vi.fn((a: number, b: number) => a + b);

    partial(fn, 10);

    expect(fn).not.toHaveBeenCalled();
  });

  it("executes the original function when the returned function is called", () => {
    const fn = vi.fn((a: number, b: number) => a + b);

    const partiallyApplied = partial(fn, 10);

    partiallyApplied(20);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(10, 20);
  });

  it("creates independent partially applied functions", () => {
    const add = (a: number, b: number) => a + b;

    const addTen = partial(add, 10);
    const addTwenty = partial(add, 20);

    expect(addTen(5)).toBe(15);
    expect(addTwenty(5)).toBe(25);
  });

  it("does not mutate the pre-applied arguments", () => {
    const fn = (...values: number[]) => values;

    const args = [1, 2];
    const partiallyApplied = partial(fn, ...args);

    const result = partiallyApplied(3);

    expect(result).toEqual([1, 2, 3]);
    expect(args).toEqual([1, 2]);
  });

  it("supports functions with zero arguments", () => {
    const fn = vi.fn(() => 42);

    const partiallyApplied = partial(fn);

    expect(partiallyApplied()).toBe(42);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("allows extra arguments when the original function accepts them", () => {
    const fn = (...values: number[]) =>
      values.reduce((sum, value) => sum + value, 0);

    const partiallyApplied = partial(fn, 1, 2);

    expect(partiallyApplied(3, 4)).toBe(10);
  });
});
