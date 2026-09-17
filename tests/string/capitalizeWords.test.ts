import { describe, expect, it } from "vitest";
import { capitalizeWords } from "../../src/string/capitalizeWords";

describe("capitalizeWords", () => {
  it("should capitalize the first letter of each word", () => {
    expect(capitalizeWords("hello world")).toBe("Hello World");
  });

  it("should lowercase the remaining characters", () => {
    expect(capitalizeWords("HELLO WORLD")).toBe("Hello World");
  });

  it("should handle mixed casing", () => {
    expect(capitalizeWords("hELLo WoRLD")).toBe("Hello World");
  });

  it("should preserve multiple spaces", () => {
    expect(capitalizeWords("hello   world")).toBe("Hello   World");
  });

  it("should handle punctuation", () => {
    expect(capitalizeWords("hello, world!")).toBe("Hello, World!");
  });

  it("should handle an empty string", () => {
    expect(capitalizeWords("")).toBe("");
  });

  it("should handle a single word", () => {
    expect(capitalizeWords("hello")).toBe("Hello");
  });

  it("should handle already capitalized words", () => {
    expect(capitalizeWords("Hello World")).toBe("Hello World");
  });

  it("should preserve leading and trailing spaces", () => {
    expect(capitalizeWords("  hello world  ")).toBe("  Hello World  ");
  });
});
