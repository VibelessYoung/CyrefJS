import { describe, expect, it } from "vitest";
import { defaults } from "../../src/object/defaults.js";

describe("defaults", () => {
  it("should add default properties that do not exist", () => {
    const user = {
      name: "Amir",
    };

    const result = defaults(user, {
      age: 22,
      role: "developer",
    });

    expect(result).toEqual({
      name: "Amir",
      age: 22,
      role: "developer",
    });
  });

  it("should not overwrite existing properties", () => {
    const user = {
      name: "Amir",
      age: 22,
    };

    const result = defaults(user, {
      age: 25,
      role: "developer",
    });

    expect(result).toEqual({
      name: "Amir",
      age: 22,
      role: "developer",
    });
  });

  it("should use the default when the property is undefined", () => {
    const user = {
      name: "Amir",
      age: undefined,
    };

    const result = defaults(user, {
      age: 22,
    });

    expect(result).toEqual({
      name: "Amir",
      age: 22,
    });
  });

  it("should preserve zero values", () => {
    const user = {
      age: 0,
    };

    const result = defaults(user, {
      age: 22,
    });

    expect(result.age).toBe(0);
  });

  it("should preserve false values", () => {
    const user = {
      active: false,
    };

    const result = defaults(user, {
      active: true,
    });

    expect(result.active).toBe(false);
  });

  it("should preserve empty string values", () => {
    const user = {
      name: "",
    };

    const result = defaults(user, {
      name: "Amir",
    });

    expect(result.name).toBe("");
  });

  it("should preserve null values", () => {
    const user = {
      value: null,
    };

    const result = defaults(user, {
      value: 100,
    });

    expect(result.value).toBeNull();
  });

  it("should not mutate the original object", () => {
    const user = {
      name: "Amir",
      age: undefined,
    };

    const original = { ...user };

    defaults(user, {
      age: 22,
    });

    expect(user).toEqual(original);
    expect(user.age).toBeUndefined();
  });

  it("should not mutate the source object", () => {
    const user = {
      name: "Amir",
    };

    const source = {
      age: 22,
      role: "developer",
    };

    const original = { ...source };

    defaults(user, source);

    expect(source).toEqual(original);
  });

  it("should return a new object", () => {
    const user = {
      name: "Amir",
    };

    const source = {
      age: 22,
    };

    const result = defaults(user, source);

    expect(result).not.toBe(user);
    expect(result).not.toBe(source);
  });

  it("should handle nested objects shallowly", () => {
    const profile = {
      city: "Mashhad",
      country: "Iran",
    };

    const user = {
      name: "Amir",
      profile,
    };

    const defaultProfile = {
      city: "Tehran",
    };

    const result = defaults(user, {
      profile: defaultProfile,
    });

    expect(result.profile).toBe(profile);
    expect(result.profile).toEqual({
      city: "Mashhad",
      country: "Iran",
    });
  });

  it("should work with empty objects", () => {
    const user = {
      name: "Amir",
      age: 22,
    };

    expect(defaults(user, {})).toEqual(user);
    expect(defaults({}, user)).toEqual(user);
    expect(defaults({}, {})).toEqual({});
  });
});
