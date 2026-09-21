import { describe, expect, it } from "vitest";
import { setQueryParam } from "../../src/url/setQueryParam";

describe("setQueryParam", () => {
  it("should add a new query parameter", () => {
    expect(setQueryParam("https://example.com/products", "page", "2")).toBe(
      "https://example.com/products?page=2",
    );
  });

  it("should update an existing query parameter", () => {
    expect(
      setQueryParam("https://example.com/products?page=1", "page", "2"),
    ).toBe("https://example.com/products?page=2");
  });

  it("should preserve existing query parameters", () => {
    expect(
      setQueryParam(
        "https://example.com/products?page=1&limit=10",
        "page",
        "2",
      ),
    ).toBe("https://example.com/products?page=2&limit=10");
  });

  it("should accept a query string with a leading question mark", () => {
    expect(setQueryParam("?page=1&limit=10", "page", "2")).toBe(
      "?page=2&limit=10",
    );
  });

  it("should accept a query string without a leading question mark", () => {
    expect(setQueryParam("page=1&limit=10", "page", "2")).toBe(
      "?page=2&limit=10",
    );
  });

  it("should encode spaces", () => {
    expect(
      setQueryParam("https://example.com/search", "q", "hello world"),
    ).toBe("https://example.com/search?q=hello+world");
  });

  it("should encode special characters", () => {
    expect(setQueryParam("https://example.com/search", "q", "a&b=c")).toBe(
      "https://example.com/search?q=a%26b%3Dc",
    );
  });

  it("should encode unicode values", () => {
    expect(setQueryParam("https://example.com/search", "q", "سلام دنیا")).toBe(
      "https://example.com/search?q=%D8%B3%D9%84%D8%A7%D9%85+%D8%AF%D9%86%DB%8C%D8%A7",
    );
  });

  it("should handle an empty value", () => {
    expect(
      setQueryParam("https://example.com/products?page=1", "page", ""),
    ).toBe("https://example.com/products?page=");
  });

  it("should replace duplicate values with a single value", () => {
    expect(
      setQueryParam(
        "https://example.com/products?tag=javascript&tag=typescript",
        "tag",
        "react",
      ),
    ).toBe("https://example.com/products?tag=react");
  });

  it("should preserve the URL hash", () => {
    expect(
      setQueryParam("https://example.com/products?page=1#section", "page", "2"),
    ).toBe("https://example.com/products?page=2#section");
  });

  it("should preserve the hash when adding a parameter", () => {
    expect(
      setQueryParam("https://example.com/products#section", "page", "2"),
    ).toBe("https://example.com/products?page=2#section");
  });

  it("should work with an empty query", () => {
    expect(setQueryParam("https://example.com/products?", "page", "2")).toBe(
      "https://example.com/products?page=2",
    );
  });

  it("should not mutate the input string", () => {
    const url = "https://example.com/products?page=1";

    setQueryParam(url, "page", "2");

    expect(url).toBe("https://example.com/products?page=1");
  });
});
