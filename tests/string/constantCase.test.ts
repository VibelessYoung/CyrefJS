import { describe, expect, it } from "vitest";
import { constantCase } from "../../src/string/constantCase.js";

describe("constantCase", () => {
  it("converts words separated by spaces", () => {
    expect(constantCase("hello world")).toBe("HELLO_WORLD");
  });

  it("converts lowercase input", () => {
    expect(constantCase("hello world")).toBe("HELLO_WORLD");
  });

  it("converts uppercase input", () => {
    expect(constantCase("HELLO WORLD")).toBe("HELLO_WORLD");
  });

  it("converts mixed-case input", () => {
    expect(constantCase("Hello World")).toBe("HELLO_WORLD");
  });

  it("handles unusual mixed casing", () => {
    expect(constantCase("hELLo WoRLD")).toBe("HELLO_WORLD");
  });

  it("handles camelCase input", () => {
    expect(constantCase("helloWorld")).toBe("HELLO_WORLD");
  });

  it("handles PascalCase input", () => {
    expect(constantCase("HelloWorld")).toBe("HELLO_WORLD");
  });

  it("handles kebab-case input", () => {
    expect(constantCase("hello-world")).toBe("HELLO_WORLD");
  });

  it("handles snake_case input", () => {
    expect(constantCase("hello_world")).toBe("HELLO_WORLD");
  });

  it("collapses multiple separators", () => {
    expect(constantCase("hello---world___test")).toBe("HELLO_WORLD_TEST");
  });

  it("removes leading separators", () => {
    expect(constantCase("---hello_world")).toBe("HELLO_WORLD");
  });

  it("removes trailing separators", () => {
    expect(constantCase("hello_world---")).toBe("HELLO_WORLD");
  });

  it("handles numbers", () => {
    expect(constantCase("version 2 update")).toBe("VERSION_2_UPDATE");
  });

  it("handles acronym followed by a word", () => {
    expect(constantCase("getURLValue")).toBe("GET_URL_VALUE");
  });

  it("handles uppercase acronym at the beginning", () => {
    expect(constantCase("HTTPServer")).toBe("HTTP_SERVER");
  });

  it("handles numbers followed by an acronym", () => {
    expect(constantCase("v2APIClient")).toBe("V2_API_CLIENT");
  });

  it("removes punctuation", () => {
    expect(constantCase("hello@world!")).toBe("HELLO_WORLD");
  });

  it("handles Unicode characters", () => {
    expect(constantCase("café français")).toBe("CAFÉ_FRANÇAIS");
  });

  it("handles a single word", () => {
    expect(constantCase("hello")).toBe("HELLO");
  });

  it("handles empty strings", () => {
    expect(constantCase("")).toBe("");
  });

  it("handles separator-only strings", () => {
    expect(constantCase("---___")).toBe("");
  });

  it("does not create duplicate separators", () => {
    expect(constantCase("hello   world")).toBe("HELLO_WORLD");
  });

  it("keeps already normalized input unchanged", () => {
    expect(constantCase("HELLO_WORLD")).toBe("HELLO_WORLD");
  });
});
