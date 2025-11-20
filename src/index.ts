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
import { isInEditorEnv } from "./utils";

export interface CreateDefaultOptionsConfig {
  isInEditor?: boolean;
}

// eslint-disable-next-line ts/explicit-function-return-type
export function createDefaultOptions(config: CreateDefaultOptionsConfig = {}) {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { isInEditor = false } = config;
  const defaultOptions = {
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
  return defaultOptions;
}

export function bernankez(
  options: OptionsConfig & Omit<TypedFlatConfigItem, "files"> = {},
  ...userConfigs: Awaitable<
    | TypedFlatConfigItem
    | TypedFlatConfigItem[]
    | FlatConfigComposer<any, any>
    | Linter.Config[]
  >[]
): FlatConfigComposer<TypedFlatConfigItem, ConfigNames> {
  let isInEditor = options.isInEditor;
  if (isInEditor === undefined || isInEditor === null) {
    isInEditor = isInEditorEnv();
  }
  const defaultOptions = createDefaultOptions({ isInEditor });
  const mergedOptions = mergeOptions(defaultOptions, options);

  const composer = antfu(mergedOptions, ...userConfigs);
  if (isInEditor) {
    composer.disableRulesFix([
      "no-useless-return",
    ], {
      builtinRules: () => import(["eslint", "use-at-your-own-risk"].join("/")).then(r => r.builtinRules),
    });
  }
  return composer;
}

export default bernankez;
