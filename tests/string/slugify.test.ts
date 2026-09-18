import { describe, expect, it } from "vitest";
import { slugify } from "../../src/string/slugify.js";

describe("slugify", () => {
  it("converts spaces to hyphens", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("converts uppercase letters to lowercase", () => {
    expect(slugify("HELLO WORLD")).toBe("hello-world");
  });

  it("removes punctuation", () => {
    expect(slugify("Hello, World!")).toBe("hello-world");
  });

  it("collapses consecutive separators", () => {
    expect(slugify("Hello---World")).toBe("hello-world");
  });

  it("collapses consecutive whitespace", () => {
    expect(slugify("Hello    World")).toBe("hello-world");
  });

  it("trims leading and trailing whitespace", () => {
    expect(slugify("   Hello World   ")).toBe("hello-world");
  });

  it("removes leading separators", () => {
    expect(slugify("---Hello World")).toBe("hello-world");
  });

  it("removes trailing separators", () => {
    expect(slugify("Hello World---")).toBe("hello-world");
  });

  it("handles underscores", () => {
    expect(slugify("Hello_World")).toBe("hello-world");
  });

  it("handles mixed separators", () => {
    expect(slugify("Hello_-_World")).toBe("hello-world");
  });

  it("preserves numbers", () => {
    expect(slugify("Hello 123 World")).toBe("hello-123-world");
  });

  it("handles a string containing only numbers", () => {
    expect(slugify("123 456")).toBe("123-456");
  });

  it("preserves Persian characters", () => {
    expect(slugify("سلام دنیا")).toBe("سلام-دنیا");
  });

  it("preserves mixed Persian and English text", () => {
    expect(slugify("Hello سلام World دنیا")).toBe("hello-سلام-world-دنیا");
  });

  it("preserves Unicode letters", () => {
    expect(slugify("Café München")).toBe("café-münchen");
  });

  it("handles emoji", () => {
    expect(slugify("Hello 😀 World")).toBe("hello-world");
  });

  it("handles symbols", () => {
    expect(slugify("Hello @#$% World")).toBe("hello-world");
  });

  it("handles an empty string", () => {
    expect(slugify("")).toBe("");
  });

  it("handles whitespace-only input", () => {
    expect(slugify("     ")).toBe("");
  });

  it("handles separator-only input", () => {
    expect(slugify("---___...")).toBe("");
  });

  it("does not create duplicate hyphens", () => {
    const result = slugify("Hello !!! --- World");

    expect(result).toBe("hello-world");
    expect(result).not.toContain("--");
  });

  it("does not start with a hyphen", () => {
    expect(slugify("!!! Hello")).not.toMatch(/^-+/);
  });

  it("does not end with a hyphen", () => {
    expect(slugify("Hello !!!")).not.toMatch(/-+$/);
  });

  it("normalizes compatible Unicode characters", () => {
    expect(slugify("ＡＢＣ ＤＥＦ")).toBe("abc-def");
  });

  it("preserves a simple slug", () => {
    expect(slugify("hello-world")).toBe("hello-world");
  });

  it("is idempotent", () => {
    const value = "Hello,   World! 123";

    expect(slugify(slugify(value))).toBe(slugify(value));
  });
});
