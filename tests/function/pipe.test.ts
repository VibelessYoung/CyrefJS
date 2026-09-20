import { describe, expect, it, vi } from "vitest";
import { pipe } from "../../src/function/pipe.js";

describe("pipe", () => {
  it("pipes two functions from left to right", () => {
    const addOne = (value: number) => value + 1;
    const double = (value: number) => value * 2;

    const piped = pipe(addOne, double);

    expect(piped(5)).toBe(12);
  });

  it("pipes multiple functions from left to right", () => {
    const addOne = (value: number) => value + 1;
    const double = (value: number) => value * 2;
    const square = (value: number) => value * value;

    const piped = pipe(addOne, double, square);

    expect(piped(5)).toBe(144);
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

    const piped = pipe(first, second, third);

    piped(10);

    expect(calls).toEqual(["first", "second", "third"]);
  });

  it("passes the result of each function to the next function", () => {
    const addOne = vi.fn((value: number) => value + 1);
    const double = vi.fn((value: number) => value * 2);

    const piped = pipe(addOne, double);

    expect(piped(5)).toBe(12);

    expect(addOne).toHaveBeenCalledWith(5);
    expect(double).toHaveBeenCalledWith(6);
  });

  it("works with a single function", () => {
    const double = (value: number) => value * 2;

    const piped = pipe(double);

    expect(piped(5)).toBe(10);
  });

  it("returns the original value when no functions are provided", () => {
    const piped = pipe<number>();

    expect(piped(42)).toBe(42);
  });

  it("works with negative numbers", () => {
    const double = (value: number) => value * 2;
    const negate = (value: number) => -value;

    const piped = pipe(double, negate);

    expect(piped(5)).toBe(-10);
  });

  it("works with strings", () => {
    const trim = (value: string) => value.trim();
    const toUpperCase = (value: string) => value.toUpperCase();
    const addExclamation = (value: string) => `${value}!`;

    const piped = pipe(trim, toUpperCase, addExclamation);

    expect(piped("  hello  ")).toBe("HELLO!");
  });

  it("does not modify the original value", () => {
    const value = "  hello  ";

    const piped = pipe(
      (input: string) => input.trim(),
      (input: string) => input.toUpperCase(),
    );

    expect(piped(value)).toBe("HELLO");
    expect(value).toBe("  hello  ");
  });
});
