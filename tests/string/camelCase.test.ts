import { describe, expect, it } from "vitest";
import { camelCase } from "../../src/string/camelCase";

describe("camelCase", () => {
  it("should convert space-separated words", () => {
    expect(camelCase("hello world")).toBe("helloWorld");
  });

  it("should convert kebab-case", () => {
    expect(camelCase("hello-world")).toBe("helloWorld");
  });

  it("should convert snake_case", () => {
    expect(camelCase("hello_world")).toBe("helloWorld");
  });

  it("should normalize uppercase input", () => {
    expect(camelCase("HELLO WORLD")).toBe("helloWorld");
  });

  it("should normalize mixed casing", () => {
    expect(camelCase("hELLo WoRLD")).toBe("helloWorld");
  });

  it("should handle multiple separators", () => {
    expect(camelCase("hello---world___test")).toBe("helloWorldTest");
  });

  it("should remove leading and trailing separators", () => {
    expect(camelCase("---hello-world---")).toBe("helloWorld");
  });

  it("should preserve numbers", () => {
    expect(camelCase("version 2 update")).toBe("version2Update");
  });

  it("should handle a single word", () => {
    expect(camelCase("hello")).toBe("hello");
  });

  it("should lowercase a single uppercase word", () => {
    expect(camelCase("HELLO")).toBe("hello");
  });

  it("should handle empty strings", () => {
    expect(camelCase("")).toBe("");
  });

  it("should handle separator-only strings", () => {
    expect(camelCase("---___...")).toBe("");
  });

  it("should handle camelCase input", () => {
    expect(camelCase("helloWorld")).toBe("helloWorld");
  });

  it("should handle PascalCase input", () => {
    expect(camelCase("HelloWorld")).toBe("helloWorld");
  });

  it("should handle acronyms", () => {
    expect(camelCase("XMLHttpRequest")).toBe("xmlHttpRequest");
  });

  it("should handle punctuation", () => {
    expect(camelCase("hello, world!")).toBe("helloWorld");
  });

  it("should handle Unicode letters", () => {
    expect(camelCase("café français")).toBe("caféFrançais");
  });

  it("should handle acronyms followed by words", () => {
    expect(camelCase("XMLHttpRequest")).toBe("xmlHttpRequest");
  });

  it("should handle acronyms in the middle of a name", () => {
    expect(camelCase("getURLValue")).toBe("getUrlValue");
  });

  it("should handle uppercase acronyms", () => {
    expect(camelCase("HTTPServer")).toBe("httpServer");
  });

  it("should normalize unusual mixed casing", () => {
    expect(camelCase("hELLo WoRLD")).toBe("helloWorld");
  });

  it("should handle numbers before acronyms", () => {
    expect(camelCase("v2APIClient")).toBe("v2ApiClient");
  });
});
