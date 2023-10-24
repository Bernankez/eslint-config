// eslint-disable-next-line unused-imports/no-unused-imports
import { RuleListener, RuleModule } from "@typescript-eslint/utils/eslint-utils";
import mustacheInterpolationQuotes from "./rules/mustache-interpolation-quotes";

export default {
  rules: {
    "mustache-interpolation-quotes": mustacheInterpolationQuotes,
  },
};
