import { describe, expect, it } from "vitest";
import { pick } from "../../src/object/pick.js";

describe("pick", () => {
  it("should pick the specified properties", () => {
    const user = {
      id: 1,
      name: "Amir",
      age: 22,
      email: "amir@example.com",
    };

    const result = pick(user, ["name", "email"]);

    expect(result).toEqual({
      name: "Amir",
      email: "amir@example.com",
    });
  });

  it("should return an empty object when no keys are provided", () => {
    const user = {
      id: 1,
      name: "Amir",
    };

    expect(pick(user, [])).toEqual({});
  });

  it("should pick a single property", () => {
    const user = {
      id: 1,
      name: "Amir",
      age: 22,
    };

    expect(pick(user, ["name"])).toEqual({
      name: "Amir",
    });
  });

  it("should preserve the original property values", () => {
    const user = {
      id: 1,
      name: "Amir",
      active: true,
    };

    const result = pick(user, ["id", "active"]);

    expect(result.id).toBe(1);
    expect(result.active).toBe(true);
  });

  it("should work with different property types", () => {
    const user = {
      name: "Amir",
      age: 22,
      active: true,
      role: "admin",
    };

    const result = pick(user, ["name", "age", "active"]);

    expect(result).toEqual({
      name: "Amir",
      age: 22,
      active: true,
    });
  });

  it("should preserve object references", () => {
    const address = {
      city: "Mashhad",
      country: "Iran",
    };

    const user = {
      name: "Amir",
      address,
    };

    const result = pick(user, ["address"]);

    expect(result.address).toBe(address);
  });

  it("should preserve array references", () => {
    const skills = ["JavaScript", "TypeScript", "React"];

    const user = {
      name: "Amir",
      skills,
    };

    const result = pick(user, ["skills"]);

    expect(result.skills).toBe(skills);
  });

  it("should not mutate the original object", () => {
    const user = {
      id: 1,
      name: "Amir",
      age: 22,
    };

    const original = { ...user };

    pick(user, ["name"]);

    expect(user).toEqual(original);
  });

  it("should return a new object", () => {
    const user = {
      id: 1,
      name: "Amir",
    };

    const result = pick(user, ["name"]);

    expect(result).not.toBe(user);
  });

  it("should work with numeric and symbol values", () => {
    const user = {
      id: 123,
      score: 99.5,
      active: false,
    };

    const result = pick(user, ["id", "score", "active"]);

    expect(result).toEqual({
      id: 123,
      score: 99.5,
      active: false,
    });
  });
});
