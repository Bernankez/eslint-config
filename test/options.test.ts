import { describe, expect, it } from "vitest";
import { mergeIgnores } from "../src/options";

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
