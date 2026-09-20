import { describe, expect, it } from "vitest";
import { buildQuery } from "../../src/url/buildQuery.js";

describe("buildQuery", () => {
  it("builds a basic query string", () => {
    expect(
      buildQuery({
        name: "amir",
        age: "20",
      }),
    ).toBe("name=amir&age=20");
  });

  it("returns an empty string for an empty object", () => {
    expect(buildQuery({})).toBe("");
  });

  it("handles a single parameter", () => {
    expect(
      buildQuery({
        page: "1",
      }),
    ).toBe("page=1");
  });

  it("encodes spaces correctly", () => {
    expect(
      buildQuery({
        search: "hello world",
      }),
    ).toBe("search=hello+world");
  });

  it("encodes special characters", () => {
    expect(
      buildQuery({
        query: "hello?world&test",
      }),
    ).toBe("query=hello%3Fworld%26test");
  });

  it("encodes unicode characters", () => {
    expect(
      buildQuery({
        name: "امیر",
      }),
    ).toBe("name=%D8%A7%D9%85%DB%8C%D8%B1");
  });

  it("handles empty values", () => {
    expect(
      buildQuery({
        name: "",
        age: "",
      }),
    ).toBe("name=&age=");
  });

  it("handles keys with empty values", () => {
    expect(
      buildQuery({
        active: "",
        debug: "",
      }),
    ).toBe("active=&debug=");
  });

  it("preserves parameter order", () => {
    expect(
      buildQuery({
        first: "1",
        second: "2",
        third: "3",
      }),
    ).toBe("first=1&second=2&third=3");
  });

  it("keeps values as strings", () => {
    const result = buildQuery({
      age: "20",
      active: "true",
    });

    expect(result).toBe("age=20&active=true");
  });

  it("does not add a leading question mark", () => {
    const result = buildQuery({
      page: "2",
    });

    expect(result.startsWith("?")).toBe(false);
  });

  it("does not mutate the input object", () => {
    const params = {
      name: "amir",
      age: "20",
    };

    buildQuery(params);

    expect(params).toEqual({
      name: "amir",
      age: "20",
    });
  });

  it("works correctly with parseQuery", () => {
    const params = {
      name: "amir",
      city: "Baku",
    };

    const query = buildQuery(params);

    expect(query).toBe("name=amir&city=Baku");
  });
});
