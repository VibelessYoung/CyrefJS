import { describe, expect, it } from "vitest";
import { isEmptyObject } from "../../src/object/isEmptyObject.js";

describe("isEmptyObject", () => {
  it("should return true for an empty object", () => {
    expect(isEmptyObject({})).toBe(true);
  });

  it("should return false for an object with one property", () => {
    expect(
      isEmptyObject({
        name: "Amir",
      }),
    ).toBe(false);
  });

  it("should return false for an object with multiple properties", () => {
    expect(
      isEmptyObject({
        name: "Amir",
        age: 22,
        active: true,
      }),
    ).toBe(false);
  });

  it("should return true for an object with only non-enumerable properties", () => {
    const object = {};

    Object.defineProperty(object, "secret", {
      value: 42,
      enumerable: false,
    });

    expect(isEmptyObject(object)).toBe(true);
  });

  it("should return true for an object with only symbol properties", () => {
    const key = Symbol("secret");

    const object = {
      [key]: 42,
    };

    expect(isEmptyObject(object)).toBe(true);
  });

  it("should return false for an object with an enumerable property", () => {
    const object = {};

    Object.defineProperty(object, "name", {
      value: "Amir",
      enumerable: true,
    });

    expect(isEmptyObject(object)).toBe(false);
  });

  it("should ignore inherited enumerable properties", () => {
    const prototype = {
      inherited: true,
    };

    const object = Object.create(prototype);

    expect(isEmptyObject(object)).toBe(true);
  });

  it("should return true for an empty array", () => {
    expect(isEmptyObject([])).toBe(true);
  });

  it("should return false for a non-empty array", () => {
    expect(isEmptyObject([1, 2, 3])).toBe(false);
  });

  it("should return true for a Date without enumerable properties", () => {
    expect(isEmptyObject(new Date())).toBe(true);
  });

  it("should return true for an empty Map", () => {
    expect(isEmptyObject(new Map())).toBe(true);
  });

  it("should return true for a Map containing entries", () => {
    const map = new Map([["name", "Amir"]]);

    expect(isEmptyObject(map)).toBe(true);
  });

  it("should return true for an object containing only non-enumerable and symbol properties", () => {
    const symbolKey = Symbol("secret");

    const object = {
      [symbolKey]: "hidden",
    };

    Object.defineProperty(object, "nonEnumerable", {
      value: "hidden",
      enumerable: false,
    });

    expect(isEmptyObject(object)).toBe(true);
  });

  it("should not mutate the object", () => {
    const object = {
      name: "Amir",
    };

    isEmptyObject(object);

    expect(object).toEqual({
      name: "Amir",
    });
  });
});
