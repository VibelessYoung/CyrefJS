import { describe, expect, it } from "vitest";
import { deepClone } from "../../src/object/deepClone.js";

describe("deepClone", () => {
  it("should clone a plain object", () => {
    const object = {
      name: "Amir",
      age: 22,
    };

    const result = deepClone(object);

    expect(result).toEqual(object);
    expect(result).not.toBe(object);
  });

  it("should deeply clone nested objects", () => {
    const object = {
      user: {
        profile: {
          name: "Amir",
        },
      },
    };

    const result = deepClone(object);

    expect(result).toEqual(object);
    expect(result).not.toBe(object);
    expect(result.user).not.toBe(object.user);
    expect(result.user.profile).not.toBe(object.user.profile);
  });

  it("should deeply clone arrays", () => {
    const object = {
      users: [{ name: "Amir" }, { name: "Ali" }],
    };

    const result = deepClone(object);

    expect(result).toEqual(object);
    expect(result.users).not.toBe(object.users);
    expect(result.users[0]).not.toBe(object.users[0]);
    expect(result.users[1]).not.toBe(object.users[1]);
  });

  it("should preserve primitive values", () => {
    const object = {
      string: "hello",
      number: 42,
      boolean: true,
      nullValue: null,
      undefinedValue: undefined,
      bigint: 100n,
    };

    const result = deepClone(object);

    expect(result).toEqual(object);
  });

  it("should clone Date instances", () => {
    const date = new Date("2026-01-01T00:00:00.000Z");

    const object = {
      date,
    };

    const result = deepClone(object);

    expect(result.date).toEqual(date);
    expect(result.date).not.toBe(date);
    expect(result.date.getTime()).toBe(date.getTime());
  });

  it("should clone RegExp instances", () => {
    const regex = /hello/gi;
    regex.lastIndex = 2;

    const object = {
      regex,
    };

    const result = deepClone(object);

    expect(result.regex).toEqual(regex);
    expect(result.regex).not.toBe(regex);
    expect(result.regex.source).toBe(regex.source);
    expect(result.regex.flags).toBe(regex.flags);
    expect(result.regex.lastIndex).toBe(2);
  });

  it("should clone Map instances and their entries", () => {
    const value = {
      name: "Amir",
    };

    const object = new Map([["user", value]]);

    const result = deepClone(object);

    expect(result).not.toBe(object);
    expect(result).toEqual(object);

    const clonedValue = result.get("user");

    expect(clonedValue).not.toBe(value);
    expect(clonedValue).toEqual(value);
  });

  it("should clone Set instances and their entries", () => {
    const value = {
      name: "Amir",
    };

    const object = new Set([value]);

    const result = deepClone(object);

    expect(result).not.toBe(object);
    expect(result.size).toBe(1);

    const clonedValue = [...result][0];

    expect(clonedValue).not.toBe(value);
    expect(clonedValue).toEqual(value);
  });

  it("should clone symbol properties", () => {
    const key = Symbol("secret");

    const object = {
      [key]: {
        value: 42,
      },
    };

    const result = deepClone(object);

    expect(result[key]).toEqual(object[key]);
    expect(result[key]).not.toBe(object[key]);
  });

  it("should preserve non-enumerable properties", () => {
    const object = {};

    Object.defineProperty(object, "secret", {
      value: {
        value: 42,
      },
      enumerable: false,
      writable: true,
      configurable: true,
    });

    const result = deepClone(object);

    const descriptor = Object.getOwnPropertyDescriptor(result, "secret");

    expect(descriptor?.enumerable).toBe(false);
    expect(descriptor?.value).toEqual({
      value: 42,
    });

    expect(descriptor?.value).not.toBe((object as { secret: object }).secret);
  });

  it("should handle circular references", () => {
    const object: {
      name: string;
      self?: unknown;
    } = {
      name: "Amir",
    };

    object.self = object;

    const result = deepClone(object);

    expect(result).not.toBe(object);
    expect(result.self).toBe(result);
  });

  it("should preserve shared references", () => {
    const shared = {
      value: 42,
    };

    const object = {
      first: shared,
      second: shared,
    };

    const result = deepClone(object);

    expect(result.first).not.toBe(shared);
    expect(result.second).not.toBe(shared);

    expect(result.first).toBe(result.second);
  });

  it("should not mutate the original nested object", () => {
    const object = {
      user: {
        profile: {
          age: 22,
        },
      },
    };

    const result = deepClone(object);

    result.user.profile.age = 30;

    expect(object.user.profile.age).toBe(22);
    expect(result.user.profile.age).toBe(30);
  });

  it("should preserve custom object prototypes", () => {
    class User {
      constructor(public name: string) {}

      greet() {
        return `Hello ${this.name}`;
      }
    }

    const object = new User("Amir");

    const result = deepClone(object);

    expect(result).not.toBe(object);
    expect(result).toBeInstanceOf(User);
    expect(result.name).toBe("Amir");
    expect(result.greet()).toBe("Hello Amir");
  });

  it("should throw when cloning WeakMap", () => {
    const object = new WeakMap<object, string>();

    expect(() => deepClone(object)).toThrow("Cannot clone WeakMap");
  });

  it("should throw when cloning WeakSet", () => {
    const object = new WeakSet<object>();

    expect(() => deepClone(object)).toThrow("Cannot clone WeakSet");
  });
});
