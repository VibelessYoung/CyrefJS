import { describe, expect, it } from "vitest";
import { isURL } from "../../src/validation/isURL";

describe("isURL", () => {
  it("should accept a basic https URL", () => {
    expect(isURL("https://example.com")).toBe(true);
  });

  it("should accept a basic http URL", () => {
    expect(isURL("http://example.com")).toBe(true);
  });

  it("should accept URLs with paths", () => {
    expect(isURL("https://example.com/products/item")).toBe(true);
  });

  it("should accept URLs with query parameters", () => {
    expect(isURL("https://example.com/products?page=2&limit=10")).toBe(true);
  });

  it("should accept URLs with hashes", () => {
    expect(isURL("https://example.com/products#details")).toBe(true);
  });

  it("should accept URLs with query parameters and hashes", () => {
    expect(isURL("https://example.com/products?page=2#details")).toBe(true);
  });

  it("should accept subdomains", () => {
    expect(isURL("https://api.example.com")).toBe(true);
  });

  it("should accept ports", () => {
    expect(isURL("http://example.com:8080")).toBe(true);
  });

  it("should accept localhost with a port", () => {
    expect(isURL("http://localhost:3000")).toBe(true);
  });

  it("should accept IP addresses", () => {
    expect(isURL("http://127.0.0.1")).toBe(true);
  });

  it("should accept IPv6 addresses", () => {
    expect(isURL("http://[::1]:3000")).toBe(true);
  });

  it("should reject URLs without a protocol", () => {
    expect(isURL("example.com")).toBe(false);
  });

  it("should reject protocol-relative URLs", () => {
    expect(isURL("//example.com")).toBe(false);
  });

  it("should reject ftp URLs", () => {
    expect(isURL("ftp://example.com")).toBe(false);
  });

  it("should reject javascript URLs", () => {
    expect(isURL("javascript:alert(1)")).toBe(false);
  });

  it("should reject data URLs", () => {
    expect(isURL("data:text/plain,hello")).toBe(false);
  });

  it("should reject an empty string", () => {
    expect(isURL("")).toBe(false);
  });

  it("should reject whitespace-only strings", () => {
    expect(isURL("   ")).toBe(false);
  });

  it("should accept surrounding whitespace", () => {
    expect(isURL("  https://example.com  ")).toBe(true);
  });

  it("should reject malformed URLs", () => {
    expect(isURL("https://")).toBe(false);

    expect(isURL("https:// example.com")).toBe(false);

    expect(isURL("https://example")).toBe(true);
  });

  it("should reject non-string values", () => {
    expect(isURL(null)).toBe(false);
    expect(isURL(undefined)).toBe(false);
    expect(isURL(123)).toBe(false);
    expect(isURL(true)).toBe(false);
    expect(isURL({})).toBe(false);
    expect(isURL([])).toBe(false);
  });
});
