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
  // Suppress warnings that are promoted to errors in CI environments (e.g., Vercel sets CI=true),
  // which cause the build to fail with exit code 1.
  inlineOnly: false,
  checks: {
    legacyCjs: false,
  },
});
