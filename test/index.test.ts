import { describe, expect, it } from "vitest";
import { mergeSubOptions } from "../src/options";

describe("should", () => {
  it("exported", () => {
    expect(1).toEqual(1);
  });
});

describe("mergeOptions", () => {
  it("should not merge with `false`", () => {
    const mergedOptions = mergeSubOptions(
      {
        vueVersion: 2,
      },
      false,
      ["vue"],
    );
    expect(mergedOptions).toBe(false);
  });
});
