import type { OptionsOverrides, StylisticConfig, TypedFlatConfigItem } from "../types";
import { pluginAntfu } from "../plugins";
import { interopDefault } from "../utils";

export const StylisticConfigDefaults: StylisticConfig = {
  indent: 2,
  jsx: true,
  quotes: "double",
  semi: true,
};

export async function stylistic(
  options: StylisticConfig & OptionsOverrides = {},
): Promise<TypedFlatConfigItem[]> {
  const {
    indent,
    jsx,
    overrides = {},
    quotes,
    semi,
  } = {
    ...StylisticConfigDefaults,
    ...options,
  };

  const pluginStylistic = await interopDefault(import("@stylistic/eslint-plugin"));

  const config = pluginStylistic.configs.customize({
    indent,
    jsx,
    pluginName: "style",
    quotes,
    semi,
  });

  return [
    {
      name: "bernankez/stylistic/rules",
      plugins: {
        antfu: pluginAntfu,
        style: pluginStylistic,
      },
      rules: {
        ...config.rules,

        "antfu/consistent-chaining": "error",
        "antfu/consistent-list-newline": "error",
        "antfu/if-newline": "error",
        "antfu/top-level-function": "error",

        "curly": ["error", "all"],
        "style/brace-style": ["error", "1tbs", { allowSingleLine: true }],

        ...overrides,
      },
    },
  ];
}
