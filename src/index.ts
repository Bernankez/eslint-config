import type {
  Awaitable,
  ConfigNames,
  OptionsConfig,
  TypedFlatConfigItem,
} from "@antfu/eslint-config";
import type { Linter } from "eslint";
import type { FlatConfigComposer } from "eslint-flat-config-utils";
import antfu from "@antfu/eslint-config";
import { mergeOptions } from "./options";

export const bernankezOptions = {
  lessOpinionated: true,
  javascript: {
    overrides: {
      "curly": ["error", "all"],
      "no-unused-vars": [
        "warn",
        {
          args: "none",
          caughtErrors: "none",
          ignoreRestSiblings: true,
          vars: "all",
        },
      ],
      "no-use-before-define": [
        "error",
        { functions: false, classes: false, variables: false },
      ],
    },
  },
  typescript: {
    overrides: {
      "ts/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "ts/no-use-before-define": [
        "error",
        { functions: false, classes: false, variables: false },
      ],
    },
  },
  vue: {
    overrides: {
      "vue/brace-style": ["error", "stroustrup"],
      "vue/custom-event-name-casing": ["warn", "camelCase"],
      "vue/html-self-closing": [
        "error",
        {
          html: {
            normal: "never",
            void: "always",
          },
        },
      ],
      "vue/v-on-event-hyphenation": ["warn", "always", { autofix: false }],
    },
  },
  stylistic: {
    semi: true,
    quotes: "double",
    overrides: {
      "antfu/if-newline": ["error"],
      "antfu/top-level-function": ["error"],
      "style/brace-style": ["error", "stroustrup"],
      "style/member-delimiter-style": [
        "error",
        { multiline: { delimiter: "semi" } },
      ],
    },
  },
  formatters: {
    markdown: "dprint",
  },
} satisfies OptionsConfig & Omit<TypedFlatConfigItem, "files">;

export function bernankez(
  options: OptionsConfig & Omit<TypedFlatConfigItem, "files"> = {},
  ...userConfigs: Awaitable<
    | TypedFlatConfigItem
    | TypedFlatConfigItem[]
    | FlatConfigComposer<any, any>
    | Linter.Config[]
  >[]
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  const mergedOptions = mergeOptions(bernankezOptions, options);

  return antfu(mergedOptions, ...userConfigs);
}
