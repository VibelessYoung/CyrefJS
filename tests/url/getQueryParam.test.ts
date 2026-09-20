import { describe, expect, it } from "vitest";
import { getQueryParam } from "../../src/url/getQueryParam.js";

describe("getQueryParam", () => {
  it("gets a parameter from a full URL", () => {
    expect(
      getQueryParam("https://example.com/products?page=2&limit=10", "page"),
    ).toBe("2");
  });

  it("gets a parameter from a query string with a question mark", () => {
    expect(getQueryParam("?page=2&limit=10", "page")).toBe("2");
  });

  it("gets a parameter from a query string without a question mark", () => {
    expect(getQueryParam("page=2&limit=10", "page")).toBe("2");
  });

  it("returns null when the parameter does not exist", () => {
    expect(getQueryParam("?page=2&limit=10", "search")).toBeNull();
  });

  it("returns null for an empty URL", () => {
    expect(getQueryParam("", "page")).toBeNull();
  });

  it("returns null for a URL without a query", () => {
    expect(getQueryParam("https://example.com/products", "page")).toBeNull();
  });

  it("decodes percent-encoded values", () => {
    expect(getQueryParam("?search=hello%20world", "search")).toBe(
      "hello world",
    );
  });

  it("decodes plus signs as spaces", () => {
    expect(getQueryParam("?search=hello+world", "search")).toBe("hello world");
  });

  it("handles unicode values", () => {
    expect(getQueryParam("?name=%D8%A7%D9%85%DB%8C%D8%B1", "name")).toBe(
      "امیر",
    );
  });

  it("returns an empty string for an empty parameter value", () => {
    expect(getQueryParam("?name=", "name")).toBe("");
  });

  it("returns the first value for duplicate parameters", () => {
    expect(getQueryParam("?tag=javascript&tag=typescript", "tag")).toBe(
      "javascript",
    );
  });

  it("handles special characters in values", () => {
    expect(getQueryParam("?query=hello%3Fworld%26test", "query")).toBe(
      "hello?world&test",
    );
  });

  it("does not mutate the input string", () => {
    const url = "https://example.com?page=2";

    getQueryParam(url, "page");

    expect(url).toBe("https://example.com?page=2");
  });
});
