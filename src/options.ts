import type { OptionsConfig, TypedFlatConfigItem } from "@antfu/eslint-config";
import type { bernankezOptions } from ".";
import defu from "defu";
import { isPackageExists } from "local-pkg";

const VuePackages = ["vue", "nuxt", "vitepress", "@slidev/cli"];

type BernankezOptions = typeof bernankezOptions;

export function mergeOptions(
  customOptions: BernankezOptions,
  userOptions: OptionsConfig & Omit<TypedFlatConfigItem, "files">,
): OptionsConfig & Omit<TypedFlatConfigItem, "files"> {
  const vue = mergeSubOptions(customOptions.vue, userOptions.vue, VuePackages);
  const javascript = defu({}, userOptions.javascript ?? {}, customOptions.javascript);
  const typescript = mergeSubOptions(
    customOptions.typescript,
    userOptions.typescript,
    ["typescript"],
  );
  const stylistic = mergeSubOptions(
    customOptions.stylistic,
    userOptions.stylistic ?? true,
  );
  const formatters = mergeSubOptions(
    customOptions.formatters,
    userOptions.formatters,
  );
  return {
    ...userOptions,
    lessOpinionated: userOptions.lessOpinionated ?? customOptions.lessOpinionated,
    vue,
    javascript,
    typescript,
    stylistic,
    formatters,
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
