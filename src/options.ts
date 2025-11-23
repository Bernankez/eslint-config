import type { OptionsConfig, TypedFlatConfigItem } from "@antfu/eslint-config";
import type { createDefaultOptions } from ".";
import defu from "defu";
import { isPackageExists } from "local-pkg";

const VuePackages = ["vue", "nuxt", "vitepress", "@slidev/cli"];

export type DefaultOptions = ReturnType<typeof createDefaultOptions>;

export function mergeOptions(
  customOptions: DefaultOptions,
  userOptions: OptionsConfig & Omit<TypedFlatConfigItem, "files">,
): OptionsConfig & Omit<TypedFlatConfigItem, "files"> {
  const javascript = defu({}, userOptions.javascript ?? {}, customOptions.javascript);
  const typescript = mergeSubOptions(customOptions.typescript, userOptions.typescript, ["typescript"]);
  const vue = mergeSubOptions(customOptions.vue, userOptions.vue, VuePackages);
  // Enable stylistic rules by default
  const stylistic = mergeSubOptions(customOptions.stylistic, userOptions.stylistic ?? true);
  const formatters = mergeSubOptions(customOptions.formatters, userOptions.formatters);
  const ignores = mergeIgnores(customOptions.ignores, userOptions.ignores ?? []) as (OptionsConfig & Omit<TypedFlatConfigItem, "files">)["ignores"];
  return {
    ...userOptions,
    lessOpinionated: userOptions.lessOpinionated ?? customOptions.lessOpinionated,
    javascript,
    typescript,
    vue,
    stylistic,
    formatters,
    ignores,
  };
}

export function mergeSubOptions<T extends object, Custom extends T>(
  customOptions: Custom,
  userOptions: boolean | T | undefined,
  detectKeys?: string[],
): T | boolean | undefined {
  switch (userOptions) {
    case true:
      return customOptions;
    case false:
      return userOptions;
    case undefined: {
      if (detectKeys?.some(i => isPackageExists(i))) {
        return customOptions;
      }
      return undefined;
    }
    default: {
      return defu<T, [T, Custom]>({}, userOptions, customOptions);
    }
  }
}

export function mergeIgnores(customIgnores: string[], userIgnores: string[] | ((originals: string[]) => string[])): string[] | ((originals: string[]) => string[]) {
  if (Array.isArray(userIgnores)) {
    return [...customIgnores, ...userIgnores];
  }
  return (originals) => {
    return [...userIgnores([...originals, ...customIgnores])];
  };
}
