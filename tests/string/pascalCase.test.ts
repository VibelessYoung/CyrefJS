import { describe, expect, it } from "vitest";
import { pascalCase } from "../../src/string/pascalCase";

describe("pascalCase", () => {
  it("should convert space-separated words", () => {
    expect(pascalCase("hello world")).toBe("HelloWorld");
  });

  it("should normalize uppercase words", () => {
    expect(pascalCase("HELLO WORLD")).toBe("HelloWorld");
  });

  it("should normalize mixed casing", () => {
    expect(pascalCase("hELLo WoRLD")).toBe("HelloWorld");
  });

  it("should handle kebab-case", () => {
    expect(pascalCase("hello-world")).toBe("HelloWorld");
  });

  it("should handle snake_case", () => {
    expect(pascalCase("hello_world")).toBe("HelloWorld");
  });

  it("should collapse multiple separators", () => {
    expect(pascalCase("hello---world___test")).toBe("HelloWorldTest");
  });

  it("should remove leading and trailing separators", () => {
    expect(pascalCase("---hello-world---")).toBe("HelloWorld");
  });

  it("should preserve numbers", () => {
    expect(pascalCase("version 2 update")).toBe("Version2Update");
  });

  it("should handle an empty string", () => {
    expect(pascalCase("")).toBe("");
  });

  it("should handle separator-only strings", () => {
    expect(pascalCase("---___...")).toBe("");
  });

  it("should convert camelCase", () => {
    expect(pascalCase("helloWorld")).toBe("HelloWorld");
  });

  it("should convert PascalCase consistently", () => {
    expect(pascalCase("HelloWorld")).toBe("HelloWorld");
  });

  it("should normalize acronyms", () => {
    expect(pascalCase("XMLHttpRequest")).toBe("XmlHttpRequest");
  });

  it("should normalize uppercase acronyms", () => {
    expect(pascalCase("HTTPServer")).toBe("HttpServer");
  });

  it("should handle acronym followed by a word", () => {
    expect(pascalCase("getURLValue")).toBe("GetUrlValue");
  });

  it("should handle numeric prefix before acronym", () => {
    expect(pascalCase("v2APIClient")).toBe("V2ApiClient");
  });

  it("should remove punctuation", () => {
    expect(pascalCase("hello, world!")).toBe("HelloWorld");
  });

  it("should support Unicode letters", () => {
    expect(pascalCase("café français")).toBe("CaféFrançais");
  });

  it("should handle a single word", () => {
    expect(pascalCase("hello")).toBe("Hello");
  });

  it("should handle a single uppercase word", () => {
    expect(pascalCase("HELLO")).toBe("Hello");
  });

  it("should handle unusual mixed casing", () => {
    expect(pascalCase("hELLo")).toBe("Hello");
  });

  it("should preserve already normalized input", () => {
    expect(pascalCase("HelloWorldTest")).toBe("HelloWorldTest");
  });
});
