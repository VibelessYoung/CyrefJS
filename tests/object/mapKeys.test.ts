import { describe, expect, it, vi } from "vitest";
import { mapKeys } from "../../src/object/mapKeys.js";

describe("mapKeys", () => {
  it("should transform all keys", () => {
    const user = {
      name: "Amir",
      age: 22,
    };

    const result = mapKeys(user, (value, key) => `user_${key}`);

    expect(result).toEqual({
      user_name: "Amir",
      user_age: 22,
    });
  });

  it("should preserve all original values", () => {
    const user = {
      name: "Amir",
      age: 22,
      active: true,
    };

    const result = mapKeys(user, (value, key) => `new_${key}`);

    expect(result).toEqual({
      new_name: "Amir",
      new_age: 22,
      new_active: true,
    });
  });

  it("should provide the current value to the iteratee", () => {
    const user = {
      name: "Amir",
      age: 22,
    };

    const result = mapKeys(user, (value) => `value_${value}`);

    expect(result).toEqual({
      value_Amir: "Amir",
      value_22: 22,
    });
  });

  it("should provide the current key to the iteratee", () => {
    const user = {
      name: "Amir",
      age: 22,
    };

    const receivedKeys: string[] = [];

    const result = mapKeys(user, (value, key) => {
      receivedKeys.push(key);

      return `mapped_${key}`;
    });

    expect(result).toEqual({
      mapped_name: "Amir",
      mapped_age: 22,
    });

    expect(receivedKeys).toEqual(["name", "age"]);
  });

  it("should provide the original object to the iteratee", () => {
    const user = {
      name: "Amir",
      age: 22,
    };

    const receivedObjects: (typeof user)[] = [];

    const result = mapKeys(user, (value, key, object) => {
      receivedObjects.push(object);

      return key;
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

    const iteratee = vi.fn((value, key) => `mapped_${key}`);

    mapKeys(user, iteratee);

    expect(iteratee).toHaveBeenCalledTimes(3);
  });

  it("should handle empty objects", () => {
    const result = mapKeys({}, (value, key) => `mapped_${key}`);

    expect(result).toEqual({});
  });

  it("should return a new object", () => {
    const user = {
      name: "Amir",
      age: 22,
    };

    const result = mapKeys(user, (value, key) => `mapped_${key}`);

    expect(result).not.toBe(user);
  });

  it("should not mutate the original object", () => {
    const user = {
      name: "Amir",
      age: 22,
    };

    const original = { ...user };

    mapKeys(user, (value, key) => `mapped_${key}`);

    expect(user).toEqual(original);
    expect(user.name).toBe("Amir");
    expect(user.age).toBe(22);
  });

  it("should preserve nested object references", () => {
    const profile = {
      city: "Mashhad",
      country: "Iran",
    };

    const user = {
      name: "Amir",
      profile,
    };

    const result = mapKeys(user, (value, key) => `user_${key}`);

    expect(result.user_profile).toBe(profile);
  });

  it("should support numeric keys returned by the iteratee", () => {
    const user = {
      first: "Amir",
      second: "Ali",
    };

    const result = mapKeys(user, (value, key) => (key === "first" ? 1 : 2));

    expect(result).toEqual({
      1: "Amir",
      2: "Ali",
    });
  });

  it("should overwrite previous values when multiple keys map to the same key", () => {
    const user = {
      firstName: "Amir",
      lastName: "Ahmadi",
    };

    const result = mapKeys(user, () => "name");

    expect(result).toEqual({
      name: "Ahmadi",
    });
  });
});
