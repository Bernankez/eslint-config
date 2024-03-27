import { execSync } from "node:child_process";

export function isGitClean() {
  try {
    execSync("git diff-index --quiet HEAD --");
    return true;
  } catch (error) {
    return false;
  }
}

export function getEslintConfigContent(
  mainConfig: string,
  additionalConfigs?: string[],
) {
  return `
import bernankez from '@bernankez/eslint-config'

export default bernankez({
${mainConfig}
}${additionalConfigs?.map(config => `,{\n${config}\n}`)})
`.trimStart();
}
