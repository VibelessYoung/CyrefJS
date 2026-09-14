import { describe, expect, it } from "vitest";
import { zip } from "../../src/array/zip.js";

describe("zip", () => {
  it("should zip two arrays of equal length", () => {
    const result = zip([1, 2, 3], ["a", "b", "c"]);

    expect(result).toEqual([
      [1, "a"],
      [2, "b"],
      [3, "c"],
    ]);
  });

  it("should stop at the shorter array", () => {
    const result = zip([1, 2, 3], ["a", "b"]);

    expect(result).toEqual([
      [1, "a"],
      [2, "b"],
    ]);
  });

  it("should stop at the shorter array when the second array is longer", () => {
    const result = zip([1, 2], ["a", "b", "c"]);

    expect(result).toEqual([
      [1, "a"],
      [2, "b"],
    ]);
  });

  it("should return an empty array when both arrays are empty", () => {
    const result = zip([], []);

    expect(result).toEqual([]);
  });

  it("should return an empty array when the first array is empty", () => {
    const result = zip([], ["a", "b", "c"]);

    expect(result).toEqual([]);
  });

  it("should return an empty array when the second array is empty", () => {
    const result = zip([1, 2, 3], []);

    expect(result).toEqual([]);
  });

  it("should work with strings", () => {
    const result = zip(
      ["Amir", "Ali", "Reza"],
      ["Frontend", "Backend", "DevOps"],
    );

    expect(result).toEqual([
      ["Amir", "Frontend"],
      ["Ali", "Backend"],
      ["Reza", "DevOps"],
    ]);
  });

  it("should work with objects", () => {
    const users = [{ name: "Amir" }, { name: "Ali" }];

    const ages = [{ age: 22 }, { age: 18 }];

    const result = zip(users, ages);

    expect(result).toEqual([
      [{ name: "Amir" }, { age: 22 }],
      [{ name: "Ali" }, { age: 18 }],
    ]);
  });

  it("should preserve the original order", () => {
    const result = zip([3, 1, 2], ["c", "a", "b"]);

    expect(result).toEqual([
      [3, "c"],
      [1, "a"],
      [2, "b"],
    ]);
  });

  it("should not mutate the original arrays", () => {
    const first = [1, 2, 3];
    const second = ["a", "b", "c"];

    const firstCopy = [...first];
    const secondCopy = [...second];

    zip(first, second);

    expect(first).toEqual(firstCopy);
    expect(second).toEqual(secondCopy);
  });
});
