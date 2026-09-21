import { describe, expect, it } from "vitest";
import { isStrongPassword } from "../../src/validation/isStrongPassword";

describe("isStrongPassword", () => {
  it("should accept a strong password", () => {
    expect(isStrongPassword("Password1!")).toBe(true);
  });

  it("should accept multiple special characters", () => {
    expect(isStrongPassword("MyPassword123@")).toBe(true);

    expect(isStrongPassword("MyPassword123#")).toBe(true);

    expect(isStrongPassword("MyPassword123$")).toBe(true);
  });

  it("should accept a password with exactly 8 characters", () => {
    expect(isStrongPassword("Abcdef1!")).toBe(true);
  });

  it("should reject passwords shorter than 8 characters", () => {
    expect(isStrongPassword("Abc1!xy")).toBe(false);
  });

  it("should reject passwords without uppercase letters", () => {
    expect(isStrongPassword("password1!")).toBe(false);
  });

  it("should reject passwords without lowercase letters", () => {
    expect(isStrongPassword("PASSWORD1!")).toBe(false);
  });

  it("should reject passwords without numbers", () => {
    expect(isStrongPassword("Password!")).toBe(false);
  });

  it("should reject passwords without special characters", () => {
    expect(isStrongPassword("Password1")).toBe(false);
  });

  it("should reject passwords containing whitespace", () => {
    expect(isStrongPassword("Password 1!")).toBe(false);
  });

  it("should reject passwords containing only spaces", () => {
    expect(isStrongPassword("        ")).toBe(false);
  });

  it("should reject an empty string", () => {
    expect(isStrongPassword("")).toBe(false);
  });

  it("should reject non-string values", () => {
    expect(isStrongPassword(null)).toBe(false);
    expect(isStrongPassword(undefined)).toBe(false);
    expect(isStrongPassword(12345678)).toBe(false);
    expect(isStrongPassword(true)).toBe(false);
    expect(isStrongPassword({})).toBe(false);
    expect(isStrongPassword([])).toBe(false);
  });

  it("should reject passwords with only letters and numbers", () => {
    expect(isStrongPassword("Password123")).toBe(false);
  });

  it("should reject passwords with only letters and special characters", () => {
    expect(isStrongPassword("Password!@#")).toBe(false);
  });

  it("should reject passwords with only numbers and special characters", () => {
    expect(isStrongPassword("12345678!")).toBe(false);
  });

  it("should accept different special characters", () => {
    expect(isStrongPassword("Password1@")).toBe(true);

    expect(isStrongPassword("Password1#")).toBe(true);

    expect(isStrongPassword("Password1$")).toBe(true);

    expect(isStrongPassword("Password1%")).toBe(true);

    expect(isStrongPassword("Password1&")).toBe(true);

    expect(isStrongPassword("Password1*")).toBe(true);
  });
});
