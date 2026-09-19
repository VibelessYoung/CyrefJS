import { describe, expect, it, vi } from "vitest";
import { compose } from "../../src/function/compose.js";

describe("compose", () => {
  it("composes two functions from right to left", () => {
    const double = (value: number) => value * 2;
    const addOne = (value: number) => value + 1;

    const composed = compose(double, addOne);

    expect(composed(5)).toBe(12);
  });

  it("composes multiple functions from right to left", () => {
    const double = (value: number) => value * 2;
    const addOne = (value: number) => value + 1;
    const square = (value: number) => value * value;

    const composed = compose(double, addOne, square);

    expect(composed(3)).toBe(20);
  });

  it("executes functions in the correct order", () => {
    const calls: string[] = [];

    const first = (value: number) => {
      calls.push("first");
      return value + 1;
    };

    const second = (value: number) => {
      calls.push("second");
      return value * 2;
    };

    const third = (value: number) => {
      calls.push("third");
      return value - 3;
    };

    const composed = compose(first, second, third);

    composed(10);

    expect(calls).toEqual(["third", "second", "first"]);
  });

  it("passes the result of each function to the next function", () => {
    const double = vi.fn((value: number) => value * 2);
    const addOne = vi.fn((value: number) => value + 1);

    const composed = compose(double, addOne);

    expect(composed(5)).toBe(12);

    expect(addOne).toHaveBeenCalledWith(5);
    expect(double).toHaveBeenCalledWith(6);
  });

  it("works with a single function", () => {
    const double = (value: number) => value * 2;

    const composed = compose(double);

    expect(composed(5)).toBe(10);
  });

  it("works with an empty list of functions", () => {
    const composed = compose<number>();

    expect(composed(42)).toBe(42);
  });

  it("works with negative numbers", () => {
    const negate = (value: number) => -value;
    const double = (value: number) => value * 2;

    const composed = compose(negate, double);

    expect(composed(5)).toBe(-10);
  });

  it("works with strings", () => {
    const toUpperCase = (value: string) => value.toUpperCase();
    const addExclamation = (value: string) => `${value}!`;

    const composed = compose(toUpperCase, addExclamation);

    expect(composed("hello")).toBe("HELLO!");
  });

  it("does not modify the original value", () => {
    const value = "hello";

    const composed = compose(
      (input: string) => input.toUpperCase(),
      (input: string) => input.trim(),
    );

    expect(composed(value)).toBe("HELLO");
    expect(value).toBe("hello");
  });
});
