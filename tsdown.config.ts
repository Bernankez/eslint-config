import { defineConfig } from "tsdown";

export default defineConfig({
  entry: [
    "src/cli.ts",
    "src/index.ts",
  ],
  dts: {
    // Workaround: @eslint/plugin-kit ships types.cts instead of types.d.cts in its CJS dist, the default oxc resolver incorrectly resolves ./types.cts to types.d.cts
    resolver: "tsc",
  },
});
