import type { OptionsConfig, TypedFlatConfigItem } from "@antfu/eslint-config";

const OptionPackageMap: Record<string, string[]> = {
  angular: [
    "@angular-eslint/eslint-plugin",
    "@angular-eslint/eslint-plugin-template",
    "@angular-eslint/template-parser",
  ],
  jsx: ["eslint-plugin-jsx-a11y"],
  nextjs: ["@next/eslint-plugin-next"],
  react: [
    "@eslint-react/eslint-plugin",
    "eslint-plugin-react-refresh",
  ],
  solid: ["eslint-plugin-solid"],
  svelte: ["eslint-plugin-svelte"],
  unocss: ["@unocss/eslint-plugin"],
  vue: ["eslint-plugin-vuejs-accessibility"],
};

export function getRequiredPackages(
  options: OptionsConfig & Omit<TypedFlatConfigItem, "files">,
): (string | undefined)[] {
  const packages: (string | undefined)[] = [];

  for (const [key, pkgs] of Object.entries(OptionPackageMap)) {
    const value = options[key as keyof OptionsConfig];

    // vue's a11y is only needed when the a11y sub-option is truthy
    if (key === "vue") {
      const sub = typeof value === "object" ? value : {};
      if (sub && "a11y" in sub && sub.a11y) {
        packages.push(...pkgs);
      }
      continue;
    }

    if (value) {
      packages.push(...pkgs);
    }
  }

  return packages;
}
