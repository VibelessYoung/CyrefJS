import { describe, expect, it } from "vitest";
import { normalizeWhitespace } from "../../src/string/normalizeWhitespace.js";

describe("normalizeWhitespace", () => {
  it("collapses multiple spaces", () => {
    expect(normalizeWhitespace("Hello   World")).toBe("Hello World");
  });

  it("trims leading whitespace", () => {
    expect(normalizeWhitespace("   Hello")).toBe("Hello");
  });

  it("trims trailing whitespace", () => {
    expect(normalizeWhitespace("Hello   ")).toBe("Hello");
  });

  it("trims leading and trailing whitespace", () => {
    expect(normalizeWhitespace("   Hello   ")).toBe("Hello");
  });

  it("handles tabs", () => {
    expect(normalizeWhitespace("Hello\t\tWorld")).toBe("Hello World");
  });

  it("handles newlines", () => {
    expect(normalizeWhitespace("Hello\n\nWorld")).toBe("Hello World");
  });

  it("handles mixed whitespace", () => {
    expect(normalizeWhitespace(" \tHello \n World\r ")).toBe("Hello World");
  });

  it("handles whitespace between multiple words", () => {
    expect(normalizeWhitespace("Hello     beautiful     World")).toBe(
      "Hello beautiful World",
    );
  });

  it("handles an empty string", () => {
    expect(normalizeWhitespace("")).toBe("");
  });

  it("handles whitespace-only strings", () => {
    expect(normalizeWhitespace("   \t\n\r  ")).toBe("");
  });

  it("handles a single word", () => {
    expect(normalizeWhitespace("Hello")).toBe("Hello");
  });

  it("handles a single space", () => {
    expect(normalizeWhitespace(" ")).toBe("");
  });

  it("handles Persian text", () => {
    expect(normalizeWhitespace("سلام   دنیا")).toBe("سلام دنیا");
  });

  it("handles mixed Persian and English text", () => {
    expect(normalizeWhitespace("Hello   سلام   World   دنیا")).toBe(
      "Hello سلام World دنیا",
    );
  });

  it("handles Unicode whitespace", () => {
    expect(normalizeWhitespace("Hello\u00A0\u00A0World")).toBe("Hello World");
  });

  it("preserves punctuation", () => {
    expect(normalizeWhitespace("Hello,   World!")).toBe("Hello, World!");
  });

  it("preserves numbers", () => {
    expect(normalizeWhitespace("123   456   789")).toBe("123 456 789");
  });

  it("preserves emoji", () => {
    expect(normalizeWhitespace("Hello   😀   World")).toBe("Hello 😀 World");
  });

  it("does not modify the original string", () => {
    const value = "Hello   World";

    normalizeWhitespace(value);

    expect(value).toBe("Hello   World");
  });

  it("is idempotent", () => {
    const value = "  Hello   World \t Test  ";

    expect(normalizeWhitespace(normalizeWhitespace(value))).toBe(
      normalizeWhitespace(value),
    );
  });
});
