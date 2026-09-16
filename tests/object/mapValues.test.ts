import { describe, expect, it, vi } from "vitest";
import { mapValues } from "../../src/object/mapValues.js";

describe("mapValues", () => {
  it("should transform all values", () => {
    const user = {
      age: 22,
      score: 80,
      level: 5,
    };

    const result = mapValues(user, (value) => value * 2);

    expect(result).toEqual({
      age: 44,
      score: 160,
      level: 10,
    });
  });

  it("should preserve all original keys", () => {
    const user = {
      age: 22,
      score: 80,
      level: 5,
    };

    const result = mapValues(user, (value) => value + 1);

    expect(Object.keys(result)).toEqual(["age", "score", "level"]);
  });

  it("should transform values into a different type", () => {
    const user = {
      age: 22,
      score: 80,
    };

    const result = mapValues(user, (value) => String(value));

    expect(result).toEqual({
      age: "22",
      score: "80",
    });
  });

  it("should provide the current key to the iteratee", () => {
    const user = {
      name: "Amir",
      city: "Mashhad",
    };

    const result = mapValues(user, (value, key) => {
      return `${key}: ${value}`;
    });

    expect(result).toEqual({
      name: "name: Amir",
      city: "city: Mashhad",
    });
  });

  it("should provide the original object to the iteratee", () => {
    const user = {
      name: "Amir",
      age: 22,
    };

    const receivedObjects: (typeof user)[] = [];

    const result = mapValues(user, (value, key, object) => {
      receivedObjects.push(object);

      return value;
    });

    expect(result).toEqual(user);
    expect(receivedObjects).toHaveLength(2);
    expect(receivedObjects[0]).toBe(user);
    expect(receivedObjects[1]).toBe(user);
  });

  it("should call the iteratee once for each property", () => {
    const user = {
      name: "Amir",
      age: 22,
      active: true,
    };

    const iteratee = vi.fn((value) => value);

    mapValues(user, iteratee);

    expect(iteratee).toHaveBeenCalledTimes(3);
  });

  it("should handle empty objects", () => {
    const result = mapValues({}, (value) => value);

    expect(result).toEqual({});
  });

  it("should return a new object", () => {
    const user = {
      age: 22,
      score: 80,
    };

    const result = mapValues(user, (value) => value * 2);

    expect(result).not.toBe(user);
  });

  it("should not mutate the original object", () => {
    const user = {
      age: 22,
      score: 80,
    };

    const original = { ...user };

    mapValues(user, (value) => value * 2);

    expect(user).toEqual(original);
    expect(user.age).toBe(22);
    expect(user.score).toBe(80);
  });

  it("should preserve nested object references when the iteratee returns the value", () => {
    const profile = {
      city: "Mashhad",
      country: "Iran",
    };

    const user = {
      name: "Amir",
      profile,
    };

    const result = mapValues(user, (value) => value);

    expect(result.profile).toBe(profile);
  });

  it("should handle different value types", () => {
    const user = {
      age: 22,
      name: "Amir",
      active: true,
    };

    const result = mapValues(user, (value) => String(value));

    expect(result).toEqual({
      age: "22",
      name: "Amir",
      active: "true",
    });
  });

  it("should transform null and undefined values", () => {
    const user = {
      first: null,
      second: undefined,
    };

    const result = mapValues(user, (value) => value ?? "default");

    expect(result).toEqual({
      first: "default",
      second: "default",
    });
  });
});
