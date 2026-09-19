import { describe, expect, it } from "vitest";
import { identity } from "../../src/function/identity.js";

describe("identity", () => {
  it("returns the same number", () => {
    const value = 42;

    expect(identity(value)).toBe(value);
  });

  it("returns the same string", () => {
    const value = "hello";

    expect(identity(value)).toBe(value);
  });

  it("returns the same boolean", () => {
    const value = true;

    expect(identity(value)).toBe(value);
  });

  it("returns null unchanged", () => {
    expect(identity(null)).toBeNull();
  });

  it("returns undefined unchanged", () => {
    expect(identity(undefined)).toBeUndefined();
  });

  it("returns the same object reference", () => {
    const value = {
      name: "Amir",
      age: 20,
    };

    const result = identity(value);

    expect(result).toBe(value);
  });

  it("returns the same array reference", () => {
    const value = [1, 2, 3];

    const result = identity(value);

    expect(result).toBe(value);
  });

  it("returns the same function reference", () => {
    const value = () => 42;

    const result = identity(value);

    expect(result).toBe(value);
  });

  it("does not modify the input", () => {
    const value = {
      name: "Amir",
      skills: ["JavaScript", "TypeScript"],
    };

    const result = identity(value);

    expect(result).toBe(value);
    expect(value).toEqual({
      name: "Amir",
      skills: ["JavaScript", "TypeScript"],
    });
  });
});
