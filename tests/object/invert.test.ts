import { describe, expect, it } from "vitest";
import { invert } from "../../src/object/invert.js";

describe("invert", () => {
  it("should swap object keys and values", () => {
    const object = {
      name: "Amir",
      city: "Baku",
    };

    const result = invert(object);

    expect(result).toEqual({
      Amir: "name",
      Baku: "city",
    });
  });

  it("should handle numeric values", () => {
    const object = {
      age: 22,
      score: 100,
    };

    const result = invert(object);

    expect(result).toEqual({
      "22": "age",
      "100": "score",
    });
  });

  it("should handle boolean values", () => {
    const object = {
      active: true,
      deleted: false,
    };

    const result = invert(object);

    expect(result).toEqual({
      true: "active",
      false: "deleted",
    });
  });

  it("should handle null and undefined values", () => {
    const object = {
      empty: null,
      missing: undefined,
    };

    const result = invert(object);

    expect(result).toEqual({
      null: "empty",
      undefined: "missing",
    });
  });

  it("should return an empty object for an empty object", () => {
    const result = invert({});

    expect(result).toEqual({});
  });

  it("should handle a single property", () => {
    const result = invert({
      name: "Amir",
    });

    expect(result).toEqual({
      Amir: "name",
    });
  });

  it("should use the last key when values are duplicated", () => {
    const object = {
      first: "user",
      second: "user",
      third: "admin",
    };

    const result = invert(object);

    expect(result).toEqual({
      user: "second",
      admin: "third",
    });
  });

  it("should convert object values to strings", () => {
    const object = {
      user: {
        id: 1,
      },
    };

    const result = invert(object);

    expect(result).toEqual({
      "[object Object]": "user",
    });
  });

  it("should convert array values to strings", () => {
    const object = {
      items: [1, 2, 3],
    };

    const result = invert(object);

    expect(result).toEqual({
      "1,2,3": "items",
    });
  });

  it("should not mutate the original object", () => {
    const object = {
      a: "x",
      b: "y",
    };

    invert(object);

    expect(object).toEqual({
      a: "x",
      b: "y",
    });
  });

  it("should return a new object", () => {
    const object = {
      a: "x",
      b: "y",
    };

    const result = invert(object);

    expect(result).not.toBe(object);
  });

  it("should preserve the original keys as output values", () => {
    const object = {
      firstName: "Amir",
      lastName: "Vibeless",
    };

    const result = invert(object);

    expect(result.Amir).toBe("firstName");
    expect(result.Vibeless).toBe("lastName");
  });
});
