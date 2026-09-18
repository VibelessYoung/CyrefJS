import { describe, expect, it } from "vitest";
import { truncate } from "../../src/string/truncate.js";

describe("truncate", () => {
  it("truncates a long string", () => {
    expect(truncate("Hello World", 8)).toBe("Hello...");
  });

  it("returns the original string when shorter than the limit", () => {
    expect(truncate("Hello", 10)).toBe("Hello");
  });

  it("returns the original string when exactly at the limit", () => {
    expect(truncate("Hello", 5)).toBe("Hello");
  });

  it("supports custom omission", () => {
    expect(truncate("Hello World", 8, "…")).toBe("Hello W…");
  });

  it("supports multi-character omission", () => {
    expect(truncate("Hello World", 10, "[...]")).toBe("Hello[...]");
  });

  it("handles an empty omission", () => {
    expect(truncate("Hello World", 5, "")).toBe("Hello");
  });

  it("handles zero length", () => {
    expect(truncate("Hello", 0)).toBe("");
  });

  it("truncates the omission when it is longer than the limit", () => {
    expect(truncate("Hello", 2)).toBe("..");
  });

  it("truncates a custom omission when it is longer than the limit", () => {
    expect(truncate("Hello", 2, "[...]")).toBe("[.");
  });

  it("handles an omission exactly equal to the limit", () => {
    expect(truncate("Hello", 3, "...")).toBe("...");
  });

  it("handles Unicode characters", () => {
    expect(truncate("Hello 😀 World", 8)).toBe("Hello...");
  });

  it("does not split Unicode emoji", () => {
    expect(truncate("😀😀😀😀😀😀", 5)).toBe("😀😀...");
  });

  it("handles a single-character string", () => {
    expect(truncate("A", 1)).toBe("A");
  });

  it("handles an empty string", () => {
    expect(truncate("", 5)).toBe("");
  });

  it("throws for negative length", () => {
    expect(() => truncate("Hello", -1)).toThrow(RangeError);
  });

  it("throws for fractional length", () => {
    expect(() => truncate("Hello", 2.5)).toThrow(RangeError);
  });

  it("throws for NaN", () => {
    expect(() => truncate("Hello", NaN)).toThrow(RangeError);
  });

  it("throws for Infinity", () => {
    expect(() => truncate("Hello", Infinity)).toThrow(RangeError);
  });

  it("supports a custom omission with Unicode", () => {
    expect(truncate("Hello World", 7, "…")).toBe("Hello …");
  });

  it("preserves the original string when no truncation is needed", () => {
    const value = "Hello World";

    expect(truncate(value, 50)).toBe(value);
  });
});
