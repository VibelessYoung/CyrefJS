import { describe, expect, it } from "vitest";
import { get } from "../../src/object/get.js";

describe("get", () => {
  it("should return the value of the specified property", () => {
    const user = {
      id: 1,
      name: "Amir",
      age: 22,
    };

    expect(get(user, "name")).toBe("Amir");
  });

  it("should return a number property", () => {
    const user = {
      name: "Amir",
      age: 22,
    };

    expect(get(user, "age")).toBe(22);
  });

  it("should return a boolean property", () => {
    const user = {
      name: "Amir",
      active: true,
    };

    expect(get(user, "active")).toBe(true);
  });

  it("should return an object property", () => {
    const address = {
      city: "Mashhad",
      country: "Iran",
    };

    const user = {
      name: "Amir",
      address,
    };

    expect(get(user, "address")).toBe(address);
  });

  it("should return an array property", () => {
    const skills = ["JavaScript", "TypeScript", "React"];

    const user = {
      name: "Amir",
      skills,
    };

    expect(get(user, "skills")).toBe(skills);
  });

  it("should return the default value when the property is undefined", () => {
    const user: {
      name: string;
      nickname?: string;
    } = {
      name: "Amir",
    };

    expect(get(user, "nickname", "Unknown")).toBe("Unknown");
  });

  it("should return undefined when the property is undefined and no default value is provided", () => {
    const user: {
      name: string;
      nickname?: string;
    } = {
      name: "Amir",
    };

    expect(get(user, "nickname")).toBeUndefined();
  });

  it("should not replace falsy values with the default value", () => {
    const data = {
      count: 0,
      name: "",
      active: false,
    };

    expect(get(data, "count", 100)).toBe(0);
    expect(get(data, "name", "Unknown")).toBe("");
    expect(get(data, "active", true)).toBe(false);
  });

  it("should return the original object reference", () => {
    const profile = {
      username: "Amir",
      age: 22,
    };

    const user = {
      profile,
    };

    expect(get(user, "profile")).toBe(profile);
  });

  it("should not mutate the original object", () => {
    const user = {
      id: 1,
      name: "Amir",
      age: 22,
    };

    const original = { ...user };

    get(user, "name");

    expect(user).toEqual(original);
  });

  it("should work with different property types", () => {
    const data = {
      stringValue: "Hello",
      numberValue: 42,
      booleanValue: true,
      arrayValue: [1, 2, 3],
      objectValue: { key: "value" },
    };

    expect(get(data, "stringValue")).toBe("Hello");
    expect(get(data, "numberValue")).toBe(42);
    expect(get(data, "booleanValue")).toBe(true);
    expect(get(data, "arrayValue")).toEqual([1, 2, 3]);
    expect(get(data, "objectValue")).toEqual({ key: "value" });
  });
});
