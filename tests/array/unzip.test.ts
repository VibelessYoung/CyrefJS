import { describe, expect, it } from "vitest";
import { unzip } from "../../src/array/unzip.js";

describe("unzip", () => {
  it("should unzip two arrays", () => {
    const result = unzip([
      [1, "a"],
      [2, "b"],
      [3, "c"],
    ]);

    expect(result).toEqual([
      [1, 2, 3],
      ["a", "b", "c"],
    ]);
  });

  it("should return empty arrays for an empty array", () => {
    expect(unzip([])).toEqual([[], []]);
  });

  it("should work with a single pair", () => {
    expect(unzip([[1, "a"]])).toEqual([[1], ["a"]]);
  });

  it("should work with numbers", () => {
    expect(
      unzip([
        [10, 20],
        [30, 40],
        [50, 60],
      ]),
    ).toEqual([
      [10, 30, 50],
      [20, 40, 60],
    ]);
  });

  it("should work with strings", () => {
    expect(
      unzip([
        ["a", "x"],
        ["b", "y"],
        ["c", "z"],
      ]),
    ).toEqual([
      ["a", "b", "c"],
      ["x", "y", "z"],
    ]);
  });

  it("should preserve duplicate values", () => {
    expect(
      unzip([
        [1, "a"],
        [1, "a"],
        [2, "b"],
      ]),
    ).toEqual([
      [1, 1, 2],
      ["a", "a", "b"],
    ]);
  });

  it("should preserve object references", () => {
    const user1 = { id: 1, name: "Amir" };
    const user2 = { id: 2, name: "Ali" };

    const result = unzip([
      [user1, 10],
      [user2, 20],
    ]);

    expect(result[0][0]).toBe(user1);
    expect(result[0][1]).toBe(user2);
  });

  it("should preserve the order of elements", () => {
    const result = unzip([
      [3, "c"],
      [1, "a"],
      [2, "b"],
    ]);

    expect(result).toEqual([
      [3, 1, 2],
      ["c", "a", "b"],
    ]);
  });

  it("should return new arrays", () => {
    const input: [number, string][] = [
      [1, "a"],
      [2, "b"],
    ];

    const result = unzip(input);

    expect(result[0]).not.toBe(input);
    expect(result[1]).not.toBe(input);
  });

  it("should work with mixed types", () => {
    const result = unzip([
      [1, true],
      [2, false],
      [3, true],
    ]);

    expect(result).toEqual([
      [1, 2, 3],
      [true, false, true],
    ]);
  });

  it("should not mutate the original array", () => {
    const input: [number, string][] = [
      [1, "a"],
      [2, "b"],
      [3, "c"],
    ];

    const original = structuredClone(input);

    unzip(input);

    expect(input).toEqual(original);
  });
});
