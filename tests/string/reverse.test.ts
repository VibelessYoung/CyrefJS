import { describe, expect, it } from "vitest";
import { reverse } from "../../src/string/reverse.js";

describe("reverse", () => {
  it("reverses a simple string", () => {
    expect(reverse("Hello")).toBe("olleH");
  });

  it("reverses a string with multiple words", () => {
    expect(reverse("Hello World")).toBe("dlroW olleH");
  });

  it("reverses an empty string", () => {
    expect(reverse("")).toBe("");
  });

  it("reverses a single-character string", () => {
    expect(reverse("A")).toBe("A");
  });

  it("reverses a numeric string", () => {
    expect(reverse("12345")).toBe("54321");
  });

  it("reverses a string containing punctuation", () => {
    expect(reverse("Hello, World!")).toBe("!dlroW ,olleH");
  });

  it("preserves whitespace while reversing", () => {
    expect(reverse("Hello  World")).toBe("dlroW  olleH");
  });

  it("reverses leading and trailing whitespace", () => {
    expect(reverse("  Hello  ")).toBe("  olleH  ");
  });

  it("handles Unicode characters", () => {
    expect(reverse("سلام")).toBe("مالس");
  });

  it("does not split emoji", () => {
    expect(reverse("😀😎🔥")).toBe("🔥😎😀");
  });

  it("handles mixed ASCII and Unicode characters", () => {
    expect(reverse("Hello 😀 World")).toBe("dlroW 😀 olleH");
  });

  it("handles repeated characters", () => {
    expect(reverse("aaaa")).toBe("aaaa");
  });

  it("handles a palindrome", () => {
    expect(reverse("madam")).toBe("madam");
  });

  it("handles mixed numbers and letters", () => {
    expect(reverse("abc123")).toBe("321cba");
  });

  it("handles symbols", () => {
    expect(reverse("@#$%")).toBe("%$#@");
  });

  it("handles newline characters", () => {
    expect(reverse("Hello\nWorld")).toBe("dlroW\nolleH");
  });

  it("handles tabs", () => {
    expect(reverse("Hello\tWorld")).toBe("dlroW\tolleH");
  });

  it("does not mutate the original string", () => {
    const value = "Hello World";

    reverse(value);

    expect(value).toBe("Hello World");
  });

  it("returns a new string with the same Unicode length", () => {
    const value = "Hello 😀 World";
    const result = reverse(value);

    expect(Array.from(result)).toHaveLength(Array.from(value).length);
  });

  it("is reversible", () => {
    const value = "Hello 😀 World";

    expect(reverse(reverse(value))).toBe(value);
  });
});
