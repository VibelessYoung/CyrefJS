import { describe, expect, it } from "vitest";
import { kebabCase } from "../../src/string/kebabCase.js";

describe("kebabCase", () => {
  it("converts words separated by spaces", () => {
    expect(kebabCase("hello world")).toBe("hello-world");
  });

  it("converts uppercase input", () => {
    expect(kebabCase("HELLO WORLD")).toBe("hello-world");
  });

  it("converts mixed-case input", () => {
    expect(kebabCase("Hello World")).toBe("hello-world");
  });

  it("handles unusual mixed casing", () => {
    expect(kebabCase("hELLo WoRLD")).toBe("hello-world");
  });

  it("handles camelCase input", () => {
    expect(kebabCase("helloWorld")).toBe("hello-world");
  });

  it("handles PascalCase input", () => {
    expect(kebabCase("HelloWorld")).toBe("hello-world");
  });

  it("handles kebab-case input", () => {
    expect(kebabCase("hello-world")).toBe("hello-world");
  });

  it("handles snake_case input", () => {
    expect(kebabCase("hello_world")).toBe("hello-world");
  });

  it("collapses multiple separators", () => {
    expect(kebabCase("hello---world___test")).toBe("hello-world-test");
  });

  it("removes leading separators", () => {
    expect(kebabCase("---hello-world")).toBe("hello-world");
  });

  it("removes trailing separators", () => {
    expect(kebabCase("hello-world---")).toBe("hello-world");
  });

  it("handles numbers", () => {
    expect(kebabCase("version 2 update")).toBe("version-2-update");
  });

  it("handles acronym followed by a word", () => {
    expect(kebabCase("getURLValue")).toBe("get-url-value");
  });

  it("handles uppercase acronym at the beginning", () => {
    expect(kebabCase("HTTPServer")).toBe("http-server");
  });

  it("handles numbers followed by an acronym", () => {
    expect(kebabCase("v2APIClient")).toBe("v2-api-client");
  });

  it("removes punctuation", () => {
    expect(kebabCase("hello@world!")).toBe("hello-world");
  });

  it("handles Unicode characters", () => {
    expect(kebabCase("café français")).toBe("café-français");
  });

  it("handles a single word", () => {
    expect(kebabCase("hello")).toBe("hello");
  });

  it("handles empty strings", () => {
    expect(kebabCase("")).toBe("");
  });

  it("handles separator-only strings", () => {
    expect(kebabCase("---___")).toBe("");
  });

  it("does not create duplicate separators", () => {
    expect(kebabCase("hello   world")).toBe("hello-world");
  });

  it("keeps already normalized input unchanged", () => {
    expect(kebabCase("hello-world")).toBe("hello-world");
  });
});
