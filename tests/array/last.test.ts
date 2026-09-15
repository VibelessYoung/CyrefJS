import { describe, expect, it } from "vitest";
import { last } from "../../src/array/last.js";

describe("last", () => {
  it("should return the last element", () => {
    expect(last([1, 2, 3])).toBe(3);
  });

  it("should return the last element of a single-element array", () => {
    expect(last([42])).toBe(42);
  });

  it("should return undefined for an empty array", () => {
    expect(last([])).toBeUndefined();
  });

  it("should work with strings", () => {
    expect(last(["Amir", "Ali", "Reza"])).toBe("Reza");
  });

  it("should work with objects", () => {
    const users = [
      { name: "Amir", age: 22 },
      { name: "Ali", age: 18 },
    ];

    expect(last(users)).toEqual({ name: "Ali", age: 18 });
  });

  it("should preserve the original object reference", () => {
    const user = { name: "Amir" };

    expect(last([user])).toBe(user);
  });

  it("should return undefined when the last element is undefined", () => {
    expect(last([1, 2, undefined])).toBeUndefined();
  });

  it("should return null when null is the last element", () => {
    expect(last([1, 2, null])).toBeNull();
  });

  it("should not mutate the original array", () => {
    const numbers = [1, 2, 3];
    const copy = [...numbers];

    last(numbers);

    expect(numbers).toEqual(copy);
  });

  it("should return the last element regardless of its value", () => {
    expect(last([null, false, "", 0])).toBe(0);
  });
});
