import { describe, expect, it } from "vitest";
import { first } from "../../src/array/first.js";

describe("first", () => {
  it("should return the first element", () => {
    expect(first([1, 2, 3])).toBe(1);
  });

  it("should return the first element of a single-element array", () => {
    expect(first([42])).toBe(42);
  });

  it("should return undefined for an empty array", () => {
    expect(first([])).toBeUndefined();
  });

  it("should work with strings", () => {
    expect(first(["Amir", "Ali", "Reza"])).toBe("Amir");
  });

  it("should work with objects", () => {
    const users = [
      { name: "Amir", age: 22 },
      { name: "Ali", age: 18 },
    ];

    expect(first(users)).toEqual({ name: "Amir", age: 22 });
  });

  it("should preserve the original object reference", () => {
    const user = { name: "Amir" };

    expect(first([user])).toBe(user);
  });

  it("should return undefined when the first element is undefined", () => {
    expect(first([undefined, 1, 2])).toBeUndefined();
  });

  it("should return null when null is the first element", () => {
    expect(first([null, 1, 2])).toBeNull();
  });

  it("should not mutate the original array", () => {
    const numbers = [1, 2, 3];
    const copy = [...numbers];

    first(numbers);

    expect(numbers).toEqual(copy);
  });

  it("should return the first element regardless of its value", () => {
    expect(first([0, false, "", null])).toBe(0);
  });
});
