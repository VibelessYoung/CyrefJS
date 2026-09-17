import { describe, expect, it } from "vitest";
import { omit } from "../../src/object/omit.js";

describe("omit", () => {
  it("should omit the specified properties", () => {
    const user = {
      id: 1,
      name: "Amir",
      age: 22,
      email: "amir@example.com",
    };

    const result = omit(user, ["age", "email"]);

    expect(result).toEqual({
      id: 1,
      name: "Amir",
    });
  });

  it("should return a copy when no keys are provided", () => {
    const user = {
      id: 1,
      name: "Amir",
    };

    const result = omit(user, []);

    expect(result).toEqual(user);
    expect(result).not.toBe(user);
  });

  it("should omit a single property", () => {
    const user = {
      id: 1,
      name: "Amir",
      age: 22,
    };

    expect(omit(user, ["age"])).toEqual({
      id: 1,
      name: "Amir",
    });
  });

  it("should omit multiple properties", () => {
    const user = {
      id: 1,
      name: "Amir",
      age: 22,
      email: "amir@example.com",
      role: "admin",
    };

    expect(omit(user, ["age", "email", "role"])).toEqual({
      id: 1,
      name: "Amir",
    });
  });

  it("should return an empty object when all properties are omitted", () => {
    const user = {
      id: 1,
      name: "Amir",
    };

    expect(omit(user, ["id", "name"])).toEqual({});
  });

  it("should preserve the original property values", () => {
    const user = {
      id: 1,
      name: "Amir",
      active: true,
    };

    const result = omit(user, ["active"]);

    expect(result.id).toBe(1);
    expect(result.name).toBe("Amir");
  });

  it("should preserve object references", () => {
    const address = {
      city: "Mashhad",
      country: "Iran",
    };

    const user = {
      name: "Amir",
      address,
      age: 22,
    };

    const result = omit(user, ["age"]);

    expect(result.address).toBe(address);
  });

  it("should preserve array references", () => {
    const skills = ["JavaScript", "TypeScript", "React"];

    const user = {
      name: "Amir",
      skills,
      age: 22,
    };

    const result = omit(user, ["age"]);

    expect(result.skills).toBe(skills);
  });

  it("should not mutate the original object", () => {
    const user = {
      id: 1,
      name: "Amir",
      age: 22,
    };

    const original = { ...user };

    omit(user, ["age"]);

    expect(user).toEqual(original);
  });

  it("should work with different property types", () => {
    const user = {
      name: "Amir",
      age: 22,
      active: true,
      score: 99.5,
    };

    const result = omit(user, ["age", "score"]);

    expect(result).toEqual({
      name: "Amir",
      active: true,
    });
  });
});
