import { describe, expect, it } from "vitest";
import { groupBy } from "../../src/array/groupBy.js";

describe("groupBy", () => {
  it("groups objects by a property", () => {
    const users = [
      { name: "Ali", role: "admin" },
      { name: "Reza", role: "user" },
      { name: "Sara", role: "admin" },
    ];

    expect(groupBy(users, "role")).toEqual({
      admin: [
        { name: "Ali", role: "admin" },
        { name: "Sara", role: "admin" },
      ],
      user: [{ name: "Reza", role: "user" }],
    });
  });

  it("returns an empty object for an empty array", () => {
    expect(groupBy([], "role" as never)).toEqual({});
  });

  it("handles a single group", () => {
    const users = [
      { name: "Ali", role: "user" },
      { name: "Reza", role: "user" },
      { name: "Sara", role: "user" },
    ];

    expect(groupBy(users, "role")).toEqual({
      user: [
        { name: "Ali", role: "user" },
        { name: "Reza", role: "user" },
        { name: "Sara", role: "user" },
      ],
    });
  });

  it("handles every item having a different group", () => {
    const users = [
      { name: "Ali", role: "admin" },
      { name: "Reza", role: "user" },
      { name: "Sara", role: "moderator" },
    ];

    expect(groupBy(users, "role")).toEqual({
      admin: [{ name: "Ali", role: "admin" }],
      user: [{ name: "Reza", role: "user" }],
      moderator: [{ name: "Sara", role: "moderator" }],
    });
  });

  it("preserves the order of items inside each group", () => {
    const products = [
      { name: "A", category: "shirt" },
      { name: "B", category: "pants" },
      { name: "C", category: "shirt" },
      { name: "D", category: "shirt" },
    ];

    expect(groupBy(products, "category")).toEqual({
      shirt: [
        { name: "A", category: "shirt" },
        { name: "C", category: "shirt" },
        { name: "D", category: "shirt" },
      ],
      pants: [{ name: "B", category: "pants" }],
    });
  });

  it("can group by a numeric property", () => {
    const products = [
      { name: "A", price: 100 },
      { name: "B", price: 200 },
      { name: "C", price: 100 },
    ];

    expect(groupBy(products, "price")).toEqual({
      "100": [
        { name: "A", price: 100 },
        { name: "C", price: 100 },
      ],
      "200": [{ name: "B", price: 200 }],
    });
  });

  it("can group by a boolean property", () => {
    const products = [
      { name: "A", available: true },
      { name: "B", available: false },
      { name: "C", available: true },
    ];

    expect(groupBy(products, "available")).toEqual({
      true: [
        { name: "A", available: true },
        { name: "C", available: true },
      ],
      false: [{ name: "B", available: false }],
    });
  });

  it("preserves duplicate items", () => {
    const items = [
      { name: "A", type: "x" },
      { name: "A", type: "x" },
      { name: "B", type: "y" },
    ];

    expect(groupBy(items, "type")).toEqual({
      x: [
        { name: "A", type: "x" },
        { name: "A", type: "x" },
      ],
      y: [{ name: "B", type: "y" }],
    });
  });

  it("does not modify the original array", () => {
    const users = [
      { name: "Ali", role: "admin" },
      { name: "Reza", role: "user" },
    ];

    const original = [...users];

    groupBy(users, "role");

    expect(users).toEqual(original);
  });

  it("can group by different properties", () => {
    const users = [
      { name: "Ali", age: 20 },
      { name: "Reza", age: 30 },
      { name: "Sara", age: 20 },
    ];

    expect(groupBy(users, "name")).toEqual({
      Ali: [{ name: "Ali", age: 20 }],
      Reza: [{ name: "Reza", age: 30 }],
      Sara: [{ name: "Sara", age: 20 }],
    });

    expect(groupBy(users, "age")).toEqual({
      "20": [
        { name: "Ali", age: 20 },
        { name: "Sara", age: 20 },
      ],
      "30": [{ name: "Reza", age: 30 }],
    });
  });
});
