import { describe, expect, it } from "vitest";
import { set } from "../../src/object/set.js";

describe("set", () => {
  it("should set the specified property", () => {
    const user = {
      id: 1,
      name: "Amir",
      age: 22,
    };

    const result = set(user, "age", 23);

    expect(result).toEqual({
      id: 1,
      name: "Amir",
      age: 23,
    });
  });

  it("should update a string property", () => {
    const user = {
      name: "Amir",
      age: 22,
    };

    const result = set(user, "name", "Ali");

    expect(result.name).toBe("Ali");
  });

  it("should update a number property", () => {
    const user = {
      name: "Amir",
      age: 22,
    };

    const result = set(user, "age", 30);

    expect(result.age).toBe(30);
  });

  it("should update a boolean property", () => {
    const user = {
      name: "Amir",
      active: false,
    };

    const result = set(user, "active", true);

    expect(result.active).toBe(true);
  });

  it("should preserve the other properties", () => {
    const user = {
      id: 1,
      name: "Amir",
      age: 22,
      active: true,
    };

    const result = set(user, "age", 23);

    expect(result).toEqual({
      id: 1,
      name: "Amir",
      age: 23,
      active: true,
    });
  });

  it("should return a new object", () => {
    const user = {
      name: "Amir",
      age: 22,
    };

    const result = set(user, "age", 23);

    expect(result).not.toBe(user);
  });

  it("should not mutate the original object", () => {
    const user = {
      name: "Amir",
      age: 22,
    };

    const original = { ...user };

    set(user, "age", 23);

    expect(user).toEqual(original);
    expect(user.age).toBe(22);
  });

  it("should preserve nested object references", () => {
    const address = {
      city: "Mashhad",
      country: "Iran",
    };

    const user = {
      name: "Amir",
      address,
      age: 22,
    };

    const result = set(user, "age", 23);

    expect(result.address).toBe(address);
  });

  it("should preserve array references", () => {
    const skills = ["JavaScript", "TypeScript", "React"];

    const user = {
      name: "Amir",
      skills,
      age: 22,
    };

    const result = set(user, "age", 23);

    expect(result.skills).toBe(skills);
  });

  it("should allow setting an object property", () => {
    const user = {
      name: "Amir",
      age: 22,
    };

    const profile = {
      role: "developer",
      level: "junior",
    };

    const result = set(user, "profile" as never, profile);

    expect(result).toEqual({
      name: "Amir",
      age: 22,
      profile,
    });
  });

  it("should work when setting the same value", () => {
    const user = {
      name: "Amir",
      age: 22,
    };

    const result = set(user, "age", 22);

    expect(result).toEqual(user);
    expect(result).not.toBe(user);
  });
});
