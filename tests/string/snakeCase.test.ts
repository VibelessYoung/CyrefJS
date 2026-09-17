import { describe, expect, it } from "vitest";
import { snakeCase } from "../../src/string/snakeCase.js";

describe("snakeCase", () => {
  it("converts words separated by spaces", () => {
    expect(snakeCase("hello world")).toBe("hello_world");
  });

  it("converts uppercase input", () => {
    expect(snakeCase("HELLO WORLD")).toBe("hello_world");
  });

  it("converts mixed-case input", () => {
    expect(snakeCase("Hello World")).toBe("hello_world");
  });

  it("handles unusual mixed casing", () => {
    expect(snakeCase("hELLo WoRLD")).toBe("hello_world");
  });

  it("handles camelCase input", () => {
    expect(snakeCase("helloWorld")).toBe("hello_world");
  });

  it("handles PascalCase input", () => {
    expect(snakeCase("HelloWorld")).toBe("hello_world");
  });

  it("handles kebab-case input", () => {
    expect(snakeCase("hello-world")).toBe("hello_world");
  });

  it("handles snake_case input", () => {
    expect(snakeCase("hello_world")).toBe("hello_world");
  });

  it("collapses multiple separators", () => {
    expect(snakeCase("hello---world___test")).toBe("hello_world_test");
  });

  it("removes leading separators", () => {
    expect(snakeCase("---hello_world")).toBe("hello_world");
  });

  it("removes trailing separators", () => {
    expect(snakeCase("hello_world---")).toBe("hello_world");
  });

  it("handles numbers", () => {
    expect(snakeCase("version 2 update")).toBe("version_2_update");
  });

  it("handles acronym followed by a word", () => {
    expect(snakeCase("getURLValue")).toBe("get_url_value");
  });

  it("handles uppercase acronym at the beginning", () => {
    expect(snakeCase("HTTPServer")).toBe("http_server");
  });

  it("handles numbers followed by an acronym", () => {
    expect(snakeCase("v2APIClient")).toBe("v2_api_client");
  });

  it("removes punctuation", () => {
    expect(snakeCase("hello@world!")).toBe("hello_world");
  });

  it("handles Unicode characters", () => {
    expect(snakeCase("café français")).toBe("café_français");
  });

  it("handles a single word", () => {
    expect(snakeCase("hello")).toBe("hello");
  });

  it("handles empty strings", () => {
    expect(snakeCase("")).toBe("");
  });

  it("handles separator-only strings", () => {
    expect(snakeCase("---___")).toBe("");
  });

  it("does not create duplicate separators", () => {
    expect(snakeCase("hello   world")).toBe("hello_world");
  });

  it("keeps already normalized input unchanged", () => {
    expect(snakeCase("hello_world")).toBe("hello_world");
  });
});
