import { describe, expect, it, vi } from "vitest";
import { filterObject } from "../../src/object/filterObject.js";

describe("filterObject", () => {
  it("should keep properties that satisfy the predicate", () => {
    const object = {
      name: "Amir",
      age: 22,
      active: true,
    };

    const result = filterObject(object, (value) => typeof value === "string");

    expect(result).toEqual({
      name: "Amir",
    });
  });

  it("should remove properties that do not satisfy the predicate", () => {
    const object = {
      a: 1,
      b: 2,
      c: 3,
    };

    const result = filterObject(object, (value) => value > 1);

    expect(result).toEqual({
      b: 2,
      c: 3,
    });
  });

  it("should return an empty object when no property matches", () => {
    const object = {
      a: 1,
      b: 2,
    };

    const result = filterObject(object, (value) => value > 10);

    expect(result).toEqual({});
  });

  it("should keep all properties when every property matches", () => {
    const object = {
      a: 1,
      b: 2,
      c: 3,
    };

    const result = filterObject(object, () => true);

    expect(result).toEqual(object);
  });

  it("should return an empty object for an empty object", () => {
    const object = {};

    const result = filterObject(object, () => true);

    expect(result).toEqual({});
  });

  it("should filter based on the key", () => {
    const object = {
      name: "Amir",
      age: 22,
      city: "Baku",
    };

    const result = filterObject(object, (_, key) => key !== "age");

    expect(result).toEqual({
      name: "Amir",
      city: "Baku",
    });
  });

  it("should provide the original object to the predicate", () => {
    const object = {
      name: "Amir",
      age: 22,
    };

    const predicate = vi.fn(() => true);

    filterObject(object, predicate);

    expect(predicate).toHaveBeenCalledWith("Amir", "name", object);

    expect(predicate).toHaveBeenCalledWith(22, "age", object);
  });

  it("should call the predicate once for each property", () => {
    const object = {
      a: 1,
      b: 2,
      c: 3,
    };

    const predicate = vi.fn(() => true);

    filterObject(object, predicate);

    expect(predicate).toHaveBeenCalledTimes(3);
  });

  it("should not mutate the original object", () => {
    const object = {
      a: 1,
      b: 2,
      c: 3,
    };

    filterObject(object, (value) => value > 1);

    expect(object).toEqual({
      a: 1,
      b: 2,
      c: 3,
    });
  });

  it("should return a new object", () => {
    const object = {
      a: 1,
      b: 2,
    };

    const result = filterObject(object, () => true);

    expect(result).not.toBe(object);
  });

  it("should preserve object and array values by reference", () => {
    const nested = {
      active: true,
    };

    const items = [1, 2, 3];

    const object = {
      nested,
      items,
      name: "Amir",
    };

    const result = filterObject(object, (_, key) => key !== "name");

    expect(result).toEqual({
      nested,
      items,
    });

    expect(result.nested).toBe(nested);
    expect(result.items).toBe(items);
  });

  it("should preserve falsy values when they match", () => {
    const object = {
      zero: 0,
      empty: "",
      falseValue: false,
      nullValue: null,
    };

    const result = filterObject(object, () => true);

    expect(result).toEqual({
      zero: 0,
      empty: "",
      falseValue: false,
      nullValue: null,
    });
  });
});
