import { describe, expect, it, vi } from "vitest";
import { curry } from "../../src/function/curry.js";

describe("curry", () => {
  it("supports one argument at a time", () => {
    const add = (a: number, b: number, c: number) => a + b + c;

    const curriedAdd = curry(add);

    expect(curriedAdd(1)(2)(3)).toBe(6);
  });

  it("supports multiple arguments at once", () => {
    const add = (a: number, b: number, c: number) => a + b + c;

    const curriedAdd = curry(add);

    expect(curriedAdd(1, 2, 3)).toBe(6);
  });

  it("supports partial application", () => {
    const add = (a: number, b: number, c: number) => a + b + c;

    const curriedAdd = curry(add);

    const addOne = curriedAdd(1) as (...args: [number, number]) => number;

    expect(addOne(2, 3)).toBe(6);
  });

  it("supports mixed argument grouping", () => {
    const add = (a: number, b: number, c: number) => a + b + c;

    const curriedAdd = curry(add);

    expect(curriedAdd(1, 2)(3)).toBe(6);
    expect(curriedAdd(1)(2, 3)).toBe(6);
  });

  it("does not execute the original function before enough arguments are provided", () => {
    const fn = vi.fn((a: number, b: number, c: number) => a + b + c);

    const curried = curry(fn);

    const partial = curried(1);

    expect(fn).not.toHaveBeenCalled();
    expect(partial).toBeTypeOf("function");
  });

  it("executes the original function exactly once", () => {
    const fn = vi.fn((a: number, b: number) => a + b);

    const curried = curry(fn);

    const result = curried(10, 20);

    expect(result).toBe(30);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(10, 20);
  });

  it("preserves argument order", () => {
    const fn = (a: string, b: string, c: string) => `${a}-${b}-${c}`;

    const curried = curry(fn);

    expect(curried("A")("B")("C")).toBe("A-B-C");
  });

  it("supports zero-argument functions", () => {
    const fn = vi.fn(() => 42);

    const curried = curry(fn);

    expect(curried()).toBe(42);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("supports functions with two arguments", () => {
    const multiply = (a: number, b: number) => a * b;

    const curriedMultiply = curry(multiply);

    expect(curriedMultiply(5)(4)).toBe(20);
    expect(curriedMultiply(5, 4)).toBe(20);
  });

  it("supports functions with four arguments", () => {
    const sum = (a: number, b: number, c: number, d: number) => a + b + c + d;

    const curriedSum = curry(sum);

    expect(curriedSum(1)(2)(3)(4)).toBe(10);
    expect(curriedSum(1, 2)(3, 4)).toBe(10);
    expect(curriedSum(1)(2, 3, 4)).toBe(10);
    expect(curriedSum(1, 2, 3, 4)).toBe(10);
  });

  it("allows extra arguments when the required arity is reached", () => {
    const fn = vi.fn((a: number, b: number) => a + b);

    const curried = curry(fn);

    expect(curried(10, 20, 30)).toBe(30);
    expect(fn).toHaveBeenCalledWith(10, 20, 30);
  });
});
