import { describe, expect, it } from "vitest";
import { has } from "../../src/object/has.js";

describe("has", () => {
  it("should return true when the object has the specified property", () => {
    const user = {
      id: 1,
      name: "Amir",
    };

    expect(has(user, "name")).toBe(true);
  });

  it("should return false when the object does not have the specified property", () => {
    const user = {
      id: 1,
      name: "Amir",
    };

    expect(has(user, "age")).toBe(false);
  });

  it("should return true for a property whose value is undefined", () => {
    const user: {
      name: string;
      nickname?: string;
    } = {
      name: "Amir",
      nickname: undefined,
    };

    expect(has(user, "nickname")).toBe(true);
  });

  it("should distinguish an existing property from an undefined value", () => {
    const user: {
      name: string;
      nickname?: string;
    } = {
      name: "Amir",
    };

    expect(has(user, "nickname")).toBe(false);
  });

  it("should return true for an own property with a falsy value", () => {
    const data = {
      count: 0,
      name: "",
      active: false,
    };

    expect(has(data, "count")).toBe(true);
    expect(has(data, "name")).toBe(true);
    expect(has(data, "active")).toBe(true);
  });

  it("should return false for inherited properties", () => {
    const prototype = {
      role: "admin",
    };

    const user = Object.create(prototype) as {
      name: string;
    };

    user.name = "Amir";

    expect(has(user, "name")).toBe(true);
    expect(has(user, "role")).toBe(false);
  });

  it("should return false for Object prototype properties", () => {
    const user = {
      name: "Amir",
    };

    expect(has(user, "toString")).toBe(false);
    expect(has(user, "valueOf")).toBe(false);
  });

  it("should work with symbol properties", () => {
    const id = Symbol("id");

    const user = {
      name: "Amir",
      [id]: 123,
    };

    expect(has(user, id)).toBe(true);
    expect(has(user, Symbol("id"))).toBe(false);
  });

  it("should work with numeric property keys", () => {
    const values = ["JavaScript", "TypeScript", "React"];

    expect(has(values, 0)).toBe(true);
    expect(has(values, 2)).toBe(true);
    expect(has(values, 3)).toBe(false);
  });

  it("should work with objects created without a prototype", () => {
    const user = Object.create(null) as Record<string, unknown>;

    user.name = "Amir";

    expect(has(user, "name")).toBe(true);
    expect(has(user, "toString")).toBe(false);
  });

  it("should not mutate the original object", () => {
    const user = {
      id: 1,
      name: "Amir",
    };

    const original = { ...user };

    has(user, "name");

    expect(user).toEqual(original);
  });
});
