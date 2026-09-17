import { describe, expect, it } from "vitest";
import { capitalize } from "../../src/string/capitalize.js";

describe("capitalize", () => {
  it("should capitalize the first character", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("should preserve the rest of the string", () => {
    expect(capitalize("hELLO")).toBe("HELLO");
  });

  it("should work with multiple words", () => {
    expect(capitalize("hello world")).toBe("Hello world");
  });

  it("should return an empty string for empty input", () => {
    expect(capitalize("")).toBe("");
  });

  it("should handle an already capitalized string", () => {
    expect(capitalize("Hello")).toBe("Hello");
  });

  it("should handle a single lowercase character", () => {
    expect(capitalize("a")).toBe("A");
  });

  it("should handle a single uppercase character", () => {
    expect(capitalize("A")).toBe("A");
  });

  it("should preserve leading whitespace", () => {
    expect(capitalize(" hello")).toBe(" hello");
  });

  it("should preserve numbers and symbols", () => {
    expect(capitalize("123hello")).toBe("123hello");
    expect(capitalize("@hello")).toBe("@hello");
  });

  it("should not mutate the original string", () => {
    const value = "hello";

    capitalize(value);

    expect(value).toBe("hello");
  });
});
