import { describe, expect, it } from "vitest";
import { removeQueryParam } from "../../src/url/removeQueryParam";

describe("removeQueryParam", () => {
  it("should remove an existing query parameter", () => {
    expect(
      removeQueryParam("https://example.com/products?page=2&limit=10", "page"),
    ).toBe("https://example.com/products?limit=10");
  });

  it("should remove the only query parameter", () => {
    expect(
      removeQueryParam("https://example.com/products?page=2", "page"),
    ).toBe("https://example.com/products");
  });

  it("should preserve other query parameters", () => {
    expect(
      removeQueryParam(
        "https://example.com/products?page=2&limit=10&sort=price",
        "limit",
      ),
    ).toBe("https://example.com/products?page=2&sort=price");
  });

  it("should remove all duplicate values", () => {
    expect(
      removeQueryParam(
        "https://example.com/products?tag=javascript&tag=typescript&sort=asc",
        "tag",
      ),
    ).toBe("https://example.com/products?sort=asc");
  });

  it("should return the original URL when the parameter does not exist", () => {
    const url = "https://example.com/products?page=2";

    expect(removeQueryParam(url, "limit")).toBe(url);
  });

  it("should work with a query string with a leading question mark", () => {
    expect(removeQueryParam("?page=2&limit=10", "page")).toBe("?limit=10");
  });

  it("should work with a query string without a leading question mark", () => {
    expect(removeQueryParam("page=2&limit=10", "page")).toBe("?limit=10");
  });

  it("should preserve the URL hash", () => {
    expect(
      removeQueryParam(
        "https://example.com/products?page=2&limit=10#section",
        "page",
      ),
    ).toBe("https://example.com/products?limit=10#section");
  });

  it("should preserve the hash when removing the only parameter", () => {
    expect(
      removeQueryParam("https://example.com/products?page=2#section", "page"),
    ).toBe("https://example.com/products#section");
  });

  it("should return only the hash for a query-only input", () => {
    expect(removeQueryParam("page=2#section", "page")).toBe("#section");
  });

  it("should handle an empty query", () => {
    expect(removeQueryParam("https://example.com/products?", "page")).toBe(
      "https://example.com/products",
    );
  });

  it("should handle an empty query-only string", () => {
    expect(removeQueryParam("?", "page")).toBe("");
  });

  it("should handle an encoded key", () => {
    expect(
      removeQueryParam(
        "https://example.com/search?hello%20world=test&foo=bar",
        "hello world",
      ),
    ).toBe("https://example.com/search?foo=bar");
  });

  it("should not mutate the input string", () => {
    const url = "https://example.com/products?page=2&limit=10";

    removeQueryParam(url, "page");

    expect(url).toBe("https://example.com/products?page=2&limit=10");
  });
});
