import { describe, expect, it } from "vitest";
import { parseQuery } from "../../src/url/parseQuery.js";

describe("parseQuery", () => {
  it("parses a basic query string", () => {
    expect(parseQuery("?name=amir&age=20")).toEqual({
      name: "amir",
      age: "20",
    });
  });

  it("works without a leading question mark", () => {
    expect(parseQuery("name=amir&age=20")).toEqual({
      name: "amir",
      age: "20",
    });
  });

  it("returns an empty object for an empty query", () => {
    expect(parseQuery("")).toEqual({});
  });

  it("returns an empty object for only a question mark", () => {
    expect(parseQuery("?")).toEqual({});
  });

  it("decodes percent-encoded values", () => {
    expect(parseQuery("?name=Amir%20Reza")).toEqual({
      name: "Amir Reza",
    });
  });

  it("decodes plus signs as spaces", () => {
    expect(parseQuery("?search=hello+world")).toEqual({
      search: "hello world",
    });
  });

  it("handles empty values", () => {
    expect(parseQuery("?name=&age=")).toEqual({
      name: "",
      age: "",
    });
  });

  it("handles keys without values", () => {
    expect(parseQuery("?active&debug")).toEqual({
      active: "",
      debug: "",
    });
  });

  it("handles duplicate keys using the last value", () => {
    expect(parseQuery("?tag=js&tag=typescript")).toEqual({
      tag: "typescript",
    });
  });

  it("handles special characters", () => {
    expect(parseQuery("?query=hello%3Fworld%26test")).toEqual({
      query: "hello?world&test",
    });
  });

  it("handles unicode characters", () => {
    expect(parseQuery("?name=%D8%A7%D9%85%DB%8C%D8%B1")).toEqual({
      name: "امیر",
    });
  });

  it("handles a single parameter", () => {
    expect(parseQuery("?page=1")).toEqual({
      page: "1",
    });
  });

  it("preserves values as strings", () => {
    const result = parseQuery("?age=20&active=true");

    expect(result.age).toBe("20");
    expect(result.active).toBe("true");
  });

  it("does not mutate the input string", () => {
    const query = "?name=amir&age=20";

    parseQuery(query);

    expect(query).toBe("?name=amir&age=20");
  });
});
