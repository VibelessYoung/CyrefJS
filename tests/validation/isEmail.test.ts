import { describe, expect, it } from "vitest";
import { isEmail } from "../../src/validation/isEmail";

describe("isEmail", () => {
  it("should return true for a basic email", () => {
    expect(isEmail("user@example.com")).toBe(true);
  });

  it("should support subdomains", () => {
    expect(isEmail("user@mail.example.com")).toBe(true);
  });

  it("should support multiple domain levels", () => {
    expect(isEmail("user@example.co.uk")).toBe(true);
  });

  it("should support dots in the local part", () => {
    expect(isEmail("first.last@example.com")).toBe(true);
  });

  it("should support plus addressing", () => {
    expect(isEmail("user+test@example.com")).toBe(true);
  });

  it("should support common special characters", () => {
    expect(isEmail("user_name-test@example.com")).toBe(true);
  });

  it("should support numbers", () => {
    expect(isEmail("user123@example123.com")).toBe(true);
  });

  it("should reject an empty string", () => {
    expect(isEmail("")).toBe(false);
  });

  it("should reject whitespace-only strings", () => {
    expect(isEmail("   ")).toBe(false);
  });

  it("should reject missing local part", () => {
    expect(isEmail("@example.com")).toBe(false);
  });

  it("should reject missing domain", () => {
    expect(isEmail("user@")).toBe(false);
  });

  it("should reject missing @", () => {
    expect(isEmail("user.example.com")).toBe(false);
  });

  it("should reject multiple @ characters", () => {
    expect(isEmail("user@@example.com")).toBe(false);
  });

  it("should reject spaces", () => {
    expect(isEmail("user name@example.com")).toBe(false);
  });

  it("should reject consecutive dots in local part", () => {
    expect(isEmail("user..name@example.com")).toBe(false);
  });

  it("should reject leading dot in local part", () => {
    expect(isEmail(".username@example.com")).toBe(false);
  });

  it("should reject trailing dot in local part", () => {
    expect(isEmail("username.@example.com")).toBe(false);
  });

  it("should reject consecutive dots in domain", () => {
    expect(isEmail("user@example..com")).toBe(false);
  });

  it("should reject domain starting with a dot", () => {
    expect(isEmail("user@.example.com")).toBe(false);
  });

  it("should reject domain ending with a dot", () => {
    expect(isEmail("user@example.com.")).toBe(false);
  });

  it("should reject domains without a dot", () => {
    expect(isEmail("user@example")).toBe(false);
  });

  it("should reject domain labels starting with hyphen", () => {
    expect(isEmail("user@-example.com")).toBe(false);
  });

  it("should reject domain labels ending with hyphen", () => {
    expect(isEmail("user@example-.com")).toBe(false);
  });

  it("should reject invalid domain characters", () => {
    expect(isEmail("user@exam_ple.com")).toBe(false);
  });

  it("should reject non-string values", () => {
    expect(isEmail(null)).toBe(false);
    expect(isEmail(undefined)).toBe(false);
    expect(isEmail(123)).toBe(false);
    expect(isEmail(true)).toBe(false);
    expect(isEmail({})).toBe(false);
    expect(isEmail([])).toBe(false);
  });

  it("should accept surrounding whitespace", () => {
    expect(isEmail("  user@example.com  ")).toBe(true);
  });
});
