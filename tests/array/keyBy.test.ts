import { describe, expect, it } from "vitest";
import { keyBy } from "../../src/array/keyBy.js";

describe("keyBy", () => {
  it("creates an object keyed by the specified property", () => {
    const users = [
      { id: 1, name: "Ali" },
      { id: 2, name: "Reza" },
      { id: 3, name: "Sara" },
    ];

    expect(keyBy(users, "id")).toEqual({
      "1": { id: 1, name: "Ali" },
      "2": { id: 2, name: "Reza" },
      "3": { id: 3, name: "Sara" },
    });
  });

  it("returns an empty object for an empty array", () => {
    expect(keyBy([], "id" as never)).toEqual({});
  });

  it("handles a single item", () => {
    const users = [{ id: 1, name: "Ali" }];

    expect(keyBy(users, "id")).toEqual({
      "1": { id: 1, name: "Ali" },
    });
  });

  it("works with string keys", () => {
    const users = [
      { username: "ali", name: "Ali" },
      { username: "reza", name: "Reza" },
      { username: "sara", name: "Sara" },
    ];

    expect(keyBy(users, "username")).toEqual({
      ali: { username: "ali", name: "Ali" },
      reza: { username: "reza", name: "Reza" },
      sara: { username: "sara", name: "Sara" },
    });
  });

  it("works with numeric keys", () => {
    const products = [
      { price: 100, name: "T-Shirt" },
      { price: 200, name: "Jeans" },
      { price: 300, name: "Shoes" },
    ];

    expect(keyBy(products, "price")).toEqual({
      "100": { price: 100, name: "T-Shirt" },
      "200": { price: 200, name: "Jeans" },
      "300": { price: 300, name: "Shoes" },
    });
  });

  it("works with boolean keys", () => {
    const products = [
      { available: true, name: "T-Shirt" },
      { available: false, name: "Jeans" },
    ];

    expect(keyBy(products, "available")).toEqual({
      true: { available: true, name: "T-Shirt" },
      false: { available: false, name: "Jeans" },
    });
  });

  it("overwrites the previous item when keys are duplicated", () => {
    const users = [
      { id: 1, name: "Ali" },
      { id: 1, name: "Reza" },
      { id: 2, name: "Sara" },
    ];

    expect(keyBy(users, "id")).toEqual({
      "1": { id: 1, name: "Reza" },
      "2": { id: 2, name: "Sara" },
    });
  });

  it("preserves the complete original objects", () => {
    const products = [
      {
        id: 1,
        name: "T-Shirt",
        category: "clothing",
        price: 100,
      },
      {
        id: 2,
        name: "Jeans",
        category: "clothing",
        price: 200,
      },
    ];

    expect(keyBy(products, "id")).toEqual({
      "1": {
        id: 1,
        name: "T-Shirt",
        category: "clothing",
        price: 100,
      },
      "2": {
        id: 2,
        name: "Jeans",
        category: "clothing",
        price: 200,
      },
    });
  });

  it("can use different properties as keys", () => {
    const users = [
      { id: 1, username: "ali" },
      { id: 2, username: "reza" },
      { id: 3, username: "sara" },
    ];

    expect(keyBy(users, "id")).toEqual({
      "1": { id: 1, username: "ali" },
      "2": { id: 2, username: "reza" },
      "3": { id: 3, username: "sara" },
    });

    expect(keyBy(users, "username")).toEqual({
      ali: { id: 1, username: "ali" },
      reza: { id: 2, username: "reza" },
      sara: { id: 3, username: "sara" },
    });
  });

  it("does not modify the original array", () => {
    const users = [
      { id: 1, name: "Ali" },
      { id: 2, name: "Reza" },
    ];

    const original = [...users];

    keyBy(users, "id");

    expect(users).toEqual(original);
  });
});
