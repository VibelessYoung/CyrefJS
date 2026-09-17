import { describe, expect, it } from "vitest";
import { partition } from "../../src/array/partition.js";

describe("partition", () => {
  it("should split numbers based on a condition", () => {
    const result = partition([1, 2, 3, 4, 5], (n) => n % 2 === 0);

    expect(result).toEqual([
      [2, 4],
      [1, 3, 5],
    ]);
  });

  it("should put all matching items in the first array", () => {
    const result = partition([2, 4, 6], (n) => n % 2 === 0);

    expect(result).toEqual([[2, 4, 6], []]);
  });

  it("should put all non-matching items in the second array", () => {
    const result = partition([1, 3, 5], (n) => n % 2 === 0);

    expect(result).toEqual([[], [1, 3, 5]]);
  });

  it("should handle an empty array", () => {
    const result = partition([], () => true);

    expect(result).toEqual([[], []]);
  });

  it("should work with strings", () => {
    const result = partition(
      ["apple", "banana", "avocado", "orange"],
      (fruit) => fruit.startsWith("a"),
    );

    expect(result).toEqual([
      ["apple", "avocado"],
      ["banana", "orange"],
    ]);
  });

  it("should work with objects", () => {
    const users = [
      { name: "Amir", age: 22 },
      { name: "Ali", age: 16 },
      { name: "Reza", age: 25 },
    ];

    const result = partition(users, (user) => user.age >= 18);

    expect(result).toEqual([
      [
        { name: "Amir", age: 22 },
        { name: "Reza", age: 25 },
      ],
      [{ name: "Ali", age: 16 }],
    ]);
  });

  it("should preserve the original order", () => {
    const result = partition([5, 1, 8, 3, 2], (n) => n > 3);

    expect(result).toEqual([
      [5, 8],
      [1, 3, 2],
    ]);
  });

  it("should not mutate the original array", () => {
    const original = [1, 2, 3, 4];
    const copy = [...original];

    partition(original, (n) => n % 2 === 0);

    expect(original).toEqual(copy);
  });

  it("should work when the predicate always returns true", () => {
    const result = partition([1, 2, 3], () => true);

    expect(result).toEqual([[1, 2, 3], []]);
  });

  it("should work when the predicate always returns false", () => {
    const result = partition([1, 2, 3], () => false);

    expect(result).toEqual([[], [1, 2, 3]]);
  });
});
