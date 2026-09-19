import { describe, expect, it, vi } from "vitest";
import { noop } from "../../src/function/noop.js";

describe("noop", () => {
  it("returns undefined", () => {
    expect(noop()).toBeUndefined();
  });

  it("does not throw an error", () => {
    expect(() => noop()).not.toThrow();
  });

  it("can be called multiple times", () => {
    expect(() => {
      noop();
      noop();
      noop();
    }).not.toThrow();
  });

  it("does not return a value", () => {
    const result = noop();

    expect(result).toBeUndefined();
  });

  it("does not accept or process arguments", () => {
    expect(noop.length).toBe(0);
  });

  it("does not modify external state", () => {
    let value = 42;

    noop();

    expect(value).toBe(42);
  });
});
