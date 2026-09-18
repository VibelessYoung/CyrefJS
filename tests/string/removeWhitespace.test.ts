import { describe, expect, it } from "vitest";
import { removeWhitespace } from "../../src/string/removeWhitespace.js";

describe("removeWhitespace", () => {
  it("removes spaces", () => {
    expect(removeWhitespace("Hello World")).toBe("HelloWorld");
  });

  it("removes multiple spaces", () => {
    expect(removeWhitespace("Hello   World")).toBe("HelloWorld");
  });

  it("removes leading whitespace", () => {
    expect(removeWhitespace("   Hello")).toBe("Hello");
  });

  it("removes trailing whitespace", () => {
    expect(removeWhitespace("Hello   ")).toBe("Hello");
  });

  it("removes leading and trailing whitespace", () => {
    expect(removeWhitespace("   Hello   ")).toBe("Hello");
  });

  it("removes tabs", () => {
    expect(removeWhitespace("Hello\tWorld")).toBe("HelloWorld");
  });

  it("removes newlines", () => {
    expect(removeWhitespace("Hello\nWorld")).toBe("HelloWorld");
  });

  it("removes carriage returns", () => {
    expect(removeWhitespace("Hello\rWorld")).toBe("HelloWorld");
  });

  it("removes mixed whitespace", () => {
    expect(removeWhitespace(" \tHello \n World\r ")).toBe("HelloWorld");
  });

  it("handles an empty string", () => {
    expect(removeWhitespace("")).toBe("");
  });

  it("handles whitespace-only strings", () => {
    expect(removeWhitespace("   \t\n\r  ")).toBe("");
  });

  it("preserves non-whitespace characters", () => {
    expect(removeWhitespace("Hello123!@#")).toBe("Hello123!@#");
  });

  it("preserves punctuation", () => {
    expect(removeWhitespace("Hello, World!")).toBe("Hello,World!");
  });

  it("preserves numbers", () => {
    expect(removeWhitespace("123 456 789")).toBe("123456789");
  });

  it("handles Persian text", () => {
    expect(removeWhitespace("سلام دنیا")).toBe("سلامدنیا");
  });

  it("handles mixed Persian and English text", () => {
    expect(removeWhitespace("Hello سلام World دنیا")).toBe(
      "HelloسلامWorldدنیا",
    );
  });

  it("removes Unicode whitespace", () => {
    expect(removeWhitespace("Hello\u00A0World")).toBe("HelloWorld");
  });

  it("preserves emoji", () => {
    expect(removeWhitespace("Hello 😀 World")).toBe("Hello😀World");
  });

  it("does not modify the original string", () => {
    const value = "Hello World";

    removeWhitespace(value);

    expect(value).toBe("Hello World");
  });

  it("is idempotent", () => {
    const value = "Hello \t World\n!";

    expect(removeWhitespace(removeWhitespace(value))).toBe(
      removeWhitespace(value),
    );
  });
});
