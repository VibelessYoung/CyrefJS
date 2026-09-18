import { describe, expect, it } from "vitest";
import { pad } from "../../src/string/pad.js";

describe("pad", () => {
  it("pads a string with spaces by default", () => {
    expect(pad("Hello", 9)).toBe("  Hello  ");
  });

  it("pads a string with a custom character", () => {
    expect(pad("Hello", 9, "-")).toBe("--Hello--");
  });

  it("returns the original string when it already has the target length", () => {
    expect(pad("Hello", 5)).toBe("Hello");
  });

  it("returns the original string when it is longer than the target length", () => {
    expect(pad("Hello", 3)).toBe("Hello");
  });

  it("pads an empty string", () => {
    expect(pad("", 5, "-")).toBe("-----");
  });

  it("handles zero length", () => {
    expect(pad("Hello", 0)).toBe("Hello");
  });

  it("handles a negative length", () => {
    expect(() => pad("Hello", -1)).toThrow(RangeError);
  });

  it("handles a fractional length", () => {
    expect(() => pad("Hello", 5.5)).toThrow(RangeError);
  });

  it("handles NaN", () => {
    expect(() => pad("Hello", NaN)).toThrow(RangeError);
  });

  it("handles Infinity", () => {
    expect(() => pad("Hello", Infinity)).toThrow(RangeError);
  });

  it("splits odd padding with the extra character on the right", () => {
    expect(pad("Hello", 8, "-")).toBe("-Hello--");
  });

  it("pads a single-character string", () => {
    expect(pad("A", 5, "-")).toBe("--A--");
  });

  it("supports numeric-looking strings", () => {
    expect(pad("42", 6, "0")).toBe("004200");
  });

  it("supports Unicode characters", () => {
    expect(pad("😀", 5, "-")).toBe("--😀--");
  });

  it("does not split Unicode characters", () => {
    expect(pad("😀😀", 5, "-")).toBe("-😀😀--");
  });

  it("supports multi-character padding", () => {
    expect(pad("42", 8, "ab")).toBe("aba42aba");
  });

  it("returns the original string when padding is empty", () => {
    expect(pad("Hello", 10, "")).toBe("Hello");
  });

  it("handles a custom Unicode padding character", () => {
    expect(pad("Hello", 9, "😀")).toBe("😀😀Hello😀😀");
  });

  it("produces exactly the requested Unicode length", () => {
    const result = pad("😀😀", 8, "-");

    expect(Array.from(result)).toHaveLength(8);
  });
});
