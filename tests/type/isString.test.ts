import { describe, expect, it } from "vitest";
import { isString } from "../../src/type/isString.js";

describe("isString", () => {
  it("returns true for a non-empty string", () => {
    expect(isString("hello")).toBe(true);
  });

  it("returns true for an empty string", () => {
    expect(isString("")).toBe(true);
  });

  it("returns true for a string containing numbers", () => {
    expect(isString("123")).toBe(true);
  });

  it("returns true for a string containing whitespace", () => {
    expect(isString("   ")).toBe(true);
  });

  it("returns true for a multiline string", () => {
    expect(isString("hello\nworld")).toBe(true);
  });

  it("returns true for a template literal", () => {
    expect(isString(`hello world`)).toBe(true);
  });

  it("returns true for a string containing Unicode characters", () => {
    expect(isString("سلام دنیا")).toBe(true);
  });

  it("returns true for a string containing emojis", () => {
    expect(isString("Hello 👋")).toBe(true);
  });

  it("returns false for a number", () => {
    expect(isString(42)).toBe(false);
  });

  it("returns false for zero", () => {
    expect(isString(0)).toBe(false);
  });

  it("returns false for NaN", () => {
    expect(isString(NaN)).toBe(false);
  });

  it("returns false for Infinity", () => {
    expect(isString(Infinity)).toBe(false);
  });

  it("returns false for a boolean", () => {
    expect(isString(true)).toBe(false);
  });

  it("returns false for false", () => {
    expect(isString(false)).toBe(false);
  });

  it("returns false for null", () => {
    expect(isString(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isString(undefined)).toBe(false);
  });

  it("returns false for an object", () => {
    expect(isString({})).toBe(false);
  });

  it("returns false for an array", () => {
    expect(isString([])).toBe(false);
  });

  it("returns false for a function", () => {
    expect(isString(() => {})).toBe(false);
  });

  it("returns false for a Symbol", () => {
    expect(isString(Symbol("test"))).toBe(false);
  });

  it("returns false for a BigInt", () => {
    expect(isString(123n)).toBe(false);
  });

  it("returns false for a String object", () => {
    expect(isString(new String("hello"))).toBe(false);
  });

  it("does not mutate the input", () => {
    const value = "hello";

    isString(value);

    expect(value).toBe("hello");
  });
});
