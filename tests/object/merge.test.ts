import { describe, expect, it } from "vitest";
import { merge } from "../../src/object/merge.js";

describe("merge", () => {
  it("should merge two objects", () => {
    const user = {
      name: "Amir",
      age: 22,
    };

    const info = {
      role: "developer",
      active: true,
    };

    const result = merge(user, info);

    expect(result).toEqual({
      name: "Amir",
      age: 22,
      role: "developer",
      active: true,
    });
  });

  it("should allow source properties to overwrite object properties", () => {
    const user = {
      name: "Amir",
      age: 22,
    };

    const update = {
      age: 23,
    };

    const result = merge(user, update);

    expect(result).toEqual({
      name: "Amir",
      age: 23,
    });
  });

  it("should preserve properties that exist only in the first object", () => {
    const user = {
      id: 1,
      name: "Amir",
      age: 22,
    };

    const update = {
      age: 23,
    };

    const result = merge(user, update);

    expect(result.id).toBe(1);
    expect(result.name).toBe("Amir");
    expect(result.age).toBe(23);
  });

  it("should preserve properties that exist only in the source object", () => {
    const user = {
      name: "Amir",
    };

    const info = {
      age: 22,
      role: "developer",
    };

    const result = merge(user, info);

    expect(result.age).toBe(22);
    expect(result.role).toBe("developer");
  });

  it("should return a new object", () => {
    const user = {
      name: "Amir",
      age: 22,
    };

    const info = {
      role: "developer",
    };

    const result = merge(user, info);

    expect(result).not.toBe(user);
    expect(result).not.toBe(info);
  });

  it("should not mutate the original object", () => {
    const user = {
      name: "Amir",
      age: 22,
    };

    const original = { ...user };

    merge(user, {
      age: 23,
    });

    expect(user).toEqual(original);
    expect(user.age).toBe(22);
  });

  it("should not mutate the source object", () => {
    const user = {
      name: "Amir",
    };

    const info = {
      age: 22,
      role: "developer",
    };

    const original = { ...info };

    merge(user, info);

    expect(info).toEqual(original);
  });

  it("should preserve nested object references when properties are not overwritten", () => {
    const profile = {
      city: "Mashhad",
      country: "Iran",
    };

    const user = {
      name: "Amir",
      profile,
    };

    const result = merge(user, {
      age: 22,
    });

    expect(result.profile).toBe(profile);
  });

  it("should replace nested objects shallowly", () => {
    const profile = {
      city: "Mashhad",
      country: "Iran",
    };

    const updatedProfile = {
      city: "Tehran",
    };

    const user = {
      name: "Amir",
      profile,
    };

    const result = merge(user, {
      profile: updatedProfile,
    });

    expect(result.profile).toBe(updatedProfile);
    expect(result.profile).toEqual({
      city: "Tehran",
    });
  });

  it("should work with empty objects", () => {
    const user = {
      name: "Amir",
      age: 22,
    };

    expect(merge(user, {})).toEqual(user);
    expect(merge({}, user)).toEqual(user);
    expect(merge({}, {})).toEqual({});
  });

  it("should handle properties with different types", () => {
    const user = {
      value: 22,
    };

    const update = {
      value: "twenty-two",
    };

    const result = merge(user, update);

    expect(result.value).toBe("twenty-two");
  });
});
