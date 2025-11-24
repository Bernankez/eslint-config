import { glob } from "tinyglobby";
import { describe, expect, it } from "vitest";

describe("build", () => {
  it("should have fixed output", async () => {
    const output = [
      "cli.cjs",
      "cli.d.cts",
      "cli.d.mts",
      "cli.mjs",
      "index.cjs",
      "index.d.cts",
      "index.d.mts",
      "index.mjs",
    ];

    const dist = await glob("dist/**/*", {
      cwd: process.cwd(),
    });

    for (const file of output) {
      expect(dist).toContain(`dist/${file}`);
    }
  });
});
