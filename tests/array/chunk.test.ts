import { describe, expect, it } from "vitest";
import { chunk } from "../../src/array/chunk.js";
describe("chunk", () => {
  it("splits an array into chunks", () => {
    const result = chunk([1, 2, 3, 4], 2);

    expect(result).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });
});
