import { describe, expect, it, vi } from "vitest";
import { sample } from "../../src/array/sample.js";

describe("sample", () => {
  it("should return an element from the array", () => {
    const array = [1, 2, 3, 4, 5];

    const result = sample(array);

    expect(array).toContain(result);
  });

  it("should return undefined for an empty array", () => {
    expect(sample([])).toBeUndefined();
  });

  it("should work with strings", () => {
    const array = ["a", "b", "c"];

    const result = sample(array);

    expect(array).toContain(result);
  });

  it("should return the first element when Math.random returns 0", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);

    expect(sample([10, 20, 30])).toBe(10);

    vi.restoreAllMocks();
  });

  it("should return the second element when Math.random returns 0.5", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);

    expect(sample([10, 20, 30, 40])).toBe(30);

    vi.restoreAllMocks();
  });

  it("should return the last element when Math.random returns a value near 1", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.999999);

    expect(sample([10, 20, 30])).toBe(30);

    vi.restoreAllMocks();
  });

  it("should work with a single-element array", () => {
    expect(sample([42])).toBe(42);
  });

  it("should not mutate the original array", () => {
    const array = [1, 2, 3, 4];

    sample(array);

    expect(array).toEqual([1, 2, 3, 4]);
  });

  it("should return an object from an array of objects", () => {
    const users = [
      { id: 1, name: "Amir" },
      { id: 2, name: "Ali" },
      { id: 3, name: "Reza" },
    ];

    const result = sample(users);

    expect(users).toContain(result);
  });

  it("should preserve the original object reference", () => {
    const user = { id: 1, name: "Amir" };

    vi.spyOn(Math, "random").mockReturnValue(0);

    const result = sample([user]);

    expect(result).toBe(user);

    vi.restoreAllMocks();
  });
});
