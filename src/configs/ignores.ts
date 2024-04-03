import type { TypedFlatConfigItem } from "../types";
import { GLOB_EXCLUDE } from "../globs";

export async function ignores(): Promise<TypedFlatConfigItem[]> {
  return [
    {
      ignores: GLOB_EXCLUDE,
      // waiting for ESLint v9.0.0-rc.1
      // https://github.com/eslint/eslint/releases
      // name: "bernankez/ignores",
    },
  ];
}
