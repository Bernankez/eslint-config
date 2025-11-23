import { describe, expect, it } from "vitest";
import defaultExport, { bernankez, createDefaultOptions } from "../src";

describe("index", () => {
  it("should export bernankez", () => {
    expect(bernankez).toBeDefined();
  });

  it("should export bernankez as default", () => {
    expect(defaultExport).toBe(bernankez);
  });

  it("should export createDefaultOptions", () => {
    expect(createDefaultOptions).toBeDefined();
  });
});
