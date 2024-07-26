import fs from "node:fs/promises";
import { flatConfigsToRulesDTS } from "eslint-typegen/core";
import { builtinRules } from "eslint/use-at-your-own-risk";
import type { Linter } from "eslint";
import { astro, combine, comments, formatters, imports, javascript, jsdoc, jsonc, jsx, markdown, node, perfectionist, react, regexp, solid, sortPackageJson, stylistic, svelte, test, toml, typescript, unicorn, unocss, vue, yaml } from "../src";

const configs = await combine(
  {
    plugins: {
      "": {
        rules: Object.fromEntries(builtinRules.entries()),
      },
    },
  },
  astro(),
  comments(),
  formatters(),
  imports(),
  javascript(),
  jsx(),
  jsdoc(),
  jsonc(),
  markdown(),
  node(),
  perfectionist(),
  react(),
  regexp(),
  solid(),
  sortPackageJson(),
  stylistic(),
  svelte(),
  test(),
  toml(),
  typescript(),
  unicorn(),
  unocss(),
  vue(),
  yaml(),
);

const configNames = configs.map(i => i.name).filter(Boolean) as string[];

// TODO Waiting for `eslint-typegen` to update types
let dts = await flatConfigsToRulesDTS(configs as any, {
  includeAugmentation: false,
});

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map(i => `"${i}"`).join(" | ")};
`;

await fs.writeFile("src/typegen.d.ts", dts);
