// @ts-check
import styleMigrate from "@stylistic/eslint-plugin-migrate";
import JITI from "jiti";

const jiti = JITI(import.meta.url);

/**
 * @type {import('./src').default}
 */
const bernankez = jiti("./src").default;

export default bernankez(
  {
    vue: true,
    react: true,
    svelte: true,
    astro: true,
    typescript: true,
    formatters: true,
    ignores: [
      "fixtures",
      "_fixtures",
      "typegen.d.ts",
    ],
  },
  {
    files: ["src/**/*.ts"],
    rules: {
      "perfectionist/sort-objects": "error",
    },
  },
  {
    files: ["src/configs/*.ts"],
    plugins: {
      "style-migrate": styleMigrate,
    },
    rules: {
      "style-migrate/migrate": ["error", { namespaceTo: "style" }],
    },
  },
);
