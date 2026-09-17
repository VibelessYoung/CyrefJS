import { describe, expect, it, vi } from "vitest";
import { shuffle } from "../../src/array/shuffle.js";

describe("shuffle", () => {
  it("should return an array with the same elements", () => {
    const array = [1, 2, 3, 4, 5];

    const result = shuffle(array);

    expect(result).toHaveLength(array.length);
    expect(result).toEqual(expect.arrayContaining(array));
    expect(array).toEqual(expect.arrayContaining(result));
  });

  it("should return an empty array for an empty array", () => {
    expect(shuffle([])).toEqual([]);
  });

  it("should work with a single-element array", () => {
    expect(shuffle([42])).toEqual([42]);
  });

  it("should work with strings", () => {
    const array = ["a", "b", "c", "d"];

    const result = shuffle(array);

    expect(result).toHaveLength(4);
    expect(result).toEqual(expect.arrayContaining(array));
  });

  it("should not mutate the original array", () => {
    const array = [1, 2, 3, 4, 5];
    const original = [...array];

    shuffle(array);

    expect(array).toEqual(original);
  });

  it("should return a new array", () => {
    const array = [1, 2, 3];

    const result = shuffle(array);

    expect(result).not.toBe(array);
  });

  it("should preserve duplicate values", () => {
    const array = [1, 1, 2, 2, 3];

    const result = shuffle(array);

    expect(result).toHaveLength(array.length);
    expect(result).toEqual(expect.arrayContaining(array));
    expect(result).toEqual(expect.arrayContaining(array));
  });

  it("should work with objects", () => {
    const user1 = { id: 1, name: "Amir" };
    const user2 = { id: 2, name: "Ali" };
    const user3 = { id: 3, name: "Reza" };

    const users = [user1, user2, user3];

    const result = shuffle(users);

    expect(result).toHaveLength(3);
    expect(result).toContain(user1);
    expect(result).toContain(user2);
    expect(result).toContain(user3);
  });

  it("should preserve object references", () => {
    const user = { id: 1, name: "Amir" };

    const result = shuffle([user]);

    expect(result[0]).toBe(user);
  });

  it("should shuffle elements according to random values", () => {
    const array = [1, 2, 3];

    vi.spyOn(Math, "random").mockReturnValueOnce(0).mockReturnValueOnce(0);

    const result = shuffle(array);

    expect(result).toEqual([2, 3, 1]);

    vi.restoreAllMocks();
  });
});
it("should preserve duplicate values", () => {
  const array = [1, 1, 2, 2, 3];

  const result = shuffle(array);

  expect(result).toEqual(expect.arrayContaining([1, 1, 2, 2, 3]));
  expect(result).toHaveLength(array.length);

  expect(result.filter((item) => item === 1)).toHaveLength(2);
  expect(result.filter((item) => item === 2)).toHaveLength(2);
  expect(result.filter((item) => item === 3)).toHaveLength(1);
});
