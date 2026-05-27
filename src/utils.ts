import process from "node:process";
import { isPackageExists } from "local-pkg";

const isCwdInScope = isPackageExists("@bernankez/eslint-config");

export async function ensurePackages(packages: (string | undefined)[]): Promise<void> {
  if (process.env.CI || process.stdout.isTTY === false || isCwdInScope === false) {
    return;
  }
  const nonExistingPackages = packages.filter((i): i is string => !!i && !isPackageExists(i));
  if (nonExistingPackages.length === 0) {
    return;
  }
  const { confirm } = await import("@clack/prompts");
  if (await confirm({
    message: `${nonExistingPackages.length === 1 ? "Package is" : "Packages are"} required for this config: ${nonExistingPackages.join(", ")}. Do you want to install them?`,
  })) {
    const { installPackage } = await import("@antfu/install-pkg");
    await installPackage(nonExistingPackages, { dev: true });
  }
}

export function isInEditorEnv(): boolean {
  if (process.env.CI) {
    return false;
  }
  if (isInGitHooksOrStaged()) {
    return false;
  }
  return !!(false
    || process.env.VSCODE_PID
    || process.env.VSCODE_CWD
    || process.env.JETBRAINS_IDE
    || process.env.VIM
    || process.env.NVIM
    || (process.env.ZED_ENVIRONMENT && !process.env.ZED_TERM)
  );
}

export function isInGitHooksOrStaged(): boolean {
  return !!(false
    || process.env.GIT_PARAMS
    || process.env.VSCODE_GIT_COMMAND
    || process.env.npm_lifecycle_script?.startsWith("lint-staged")
    || process.env.npm_lifecycle_script?.startsWith("nano-starged")
  );
}
