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
import { getRequiredPackages } from "./packages";
import { ensurePackages, isInEditorEnv } from "./utils";

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
            args: "after-used",
            argsIgnorePattern: "^_",
            caughtErrors: "all",
            caughtErrorsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
            vars: "all",
            varsIgnorePattern: "^_",
            ignoreRestSiblings: true,
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
        "ts/no-unused-vars": [
          "warn",
          {
            args: "after-used",
            argsIgnorePattern: "^_",
            caughtErrors: "all",
            caughtErrorsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
            vars: "all",
            varsIgnorePattern: "^_",
            ignoreRestSiblings: true,
          },
        ],
        "ts/no-use-before-define": [
          "error",
          { functions: false, classes: false, variables: false },
        ],
      },
    },
    vue: {
      overrides: {
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
      braceStyle: "stroustrup",
      overrides: {
        "antfu/if-newline": ["error"],
        "antfu/top-level-function": ["error"],
        "antfu/consistent-list-newline": ["error", { IfStatement: false }],
        "style/member-delimiter-style": [
          "error",
          { multiline: { delimiter: "semi" } },
        ],
      },
    },
    formatters: {
      markdown: "dprint",
    },
    ignores: [
      // MacOS metadata files
      "**/._*",
    ],
  } satisfies OptionsConfig & Omit<TypedFlatConfigItem, "files">;
  return defaultOptions;
}

export async function bernankez(
  options: OptionsConfig & Omit<TypedFlatConfigItem, "files"> = {},
  ...userConfigs: Awaitable<
    | TypedFlatConfigItem
    | TypedFlatConfigItem[]
    | FlatConfigComposer<any, any>
    | Linter.Config[]
  >[]
): Promise<FlatConfigComposer<TypedFlatConfigItem, ConfigNames>> {
  let isInEditor = options.isInEditor;
  isInEditor ??= isInEditorEnv();
  const defaultOptions = createDefaultOptions({ isInEditor });
  const mergedOptions = mergeOptions(defaultOptions, options);

  await ensurePackages(getRequiredPackages(mergedOptions));

  const composer = antfu({ ...mergedOptions }, ...userConfigs);
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
