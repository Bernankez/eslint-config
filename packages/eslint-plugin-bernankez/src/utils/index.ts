import { createRequire } from "node:module";
import type { TSESLint } from "@typescript-eslint/utils";
import { ESLintUtils } from "@typescript-eslint/utils";
import { version } from "eslint/package.json";
import * as semver from "semver";
export * from "./vue";

const require = createRequire(import.meta.url);
const isESLintV8 = semver.major(version) >= 8;

export const createESLintRule = ESLintUtils.RuleCreator(ruleName => ruleName);

export const getESLintCoreRule: (ruleId: string) => TSESLint.RuleModule<string, unknown[]> = isESLintV8
  ? (ruleId: string) => ESLintUtils.nullThrows(
      require("eslint/use-at-your-own-risk").builtinRules.get(
        ruleId,
      ),
  `ESLint's core rule '${ruleId}' not found.`,
    )
  : (ruleId: string) => require(`eslint/lib/rules/${ruleId}`);

