import type { DefaultOptions } from "../src/options";
import { isPackageExists } from "local-pkg";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createDefaultOptions } from "../src";
import { mergeIgnores, mergeOptions, mergeSubOptions } from "../src/options";

vi.mock("local-pkg", () => ({
  isPackageExists: vi.fn(),
}));

describe("mergeOptions", () => {
  let defaultOptions: DefaultOptions;
  beforeEach(() => {
    defaultOptions = createDefaultOptions();
  });

  it("should have necessary keys", () => {
    const mergedOptions = mergeOptions(defaultOptions, {});
    expect(mergedOptions).toHaveProperty("lessOpinionated");
    expect(mergedOptions).toHaveProperty("javascript");
    expect(mergedOptions).toHaveProperty("typescript");
    expect(mergedOptions).toHaveProperty("vue");
    expect(mergedOptions).toHaveProperty("stylistic");
    expect(mergedOptions).toHaveProperty("formatters");
    expect(mergedOptions).toHaveProperty("ignores");
  });

  it("should always enable javascript rules", () => {
    const mergedOptions = mergeOptions(defaultOptions, {});
    expect(mergedOptions.javascript).toBeTruthy();
  });

  it("should enable stylistic rules by default", () => {
    const mergedOptions = mergeOptions(defaultOptions, {});
    expect(mergedOptions.stylistic).toBeTruthy();
  });

  it("should not enable stylistic rules with `stylistic:false`", () => {
    const mergedOptions = mergeOptions(defaultOptions, { stylistic: false });
    expect(mergedOptions.stylistic).toBeFalsy();
  });
});

describe("mergeSubOptions", () => {
  const customOptions = {
    a: 1,
    b: "2",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("userOptions:true", () => {
    expect(mergeSubOptions(customOptions, true)).toEqual(customOptions);
  });

  it("userOptions:false", () => {
    expect(mergeSubOptions(customOptions, false)).toEqual(false);
  });

  it("userOptions:undefined without detectKeys", () => {
    expect(mergeSubOptions(customOptions, undefined)).toEqual(undefined);
  });

  it("userOptions:undefined with detectKeys - package exists", () => {
    vi.mocked(isPackageExists).mockReturnValue(true);

    const result = mergeSubOptions(customOptions, undefined, ["vue", "react"]);

    expect(isPackageExists).toHaveBeenCalled();
    expect(result).toEqual(customOptions);
  });

  it("userOptions:undefined with detectKeys - package not exists", () => {
    vi.mocked(isPackageExists).mockReturnValue(false);

    const result = mergeSubOptions(customOptions, undefined, ["vue", "react"]);

    expect(isPackageExists).toHaveBeenCalled();
    expect(result).toEqual(undefined);
  });

  it("userOptions:object", () => {
    expect(mergeSubOptions(customOptions, { a: 3 })).toEqual({ a: 3, b: "2" });
  });
});

describe("mergeIgnores", () => {
  const originals = ["dist", "node_modules"];
  const customIgnores = ["**/._*", "test"];
  const userIgnoresArray = ["fixtures"];
  const userIgnoresFunction = (originals: string[]) => {
    return originals.filter(origin => origin !== "**/._*");
  };

  it("array", () => {
    expect(mergeIgnores(customIgnores, userIgnoresArray)).toMatchInlineSnapshot(`
      [
        "**/._*",
        "test",
        "fixtures",
      ]
    `);
  });

  it("function", () => {
    const func = mergeIgnores(customIgnores, userIgnoresFunction) as (originals: string[]) => string[];
    expect(func(originals)).toMatchInlineSnapshot(`
      [
        "dist",
        "node_modules",
        "test",
      ]
    `);
  });
});
