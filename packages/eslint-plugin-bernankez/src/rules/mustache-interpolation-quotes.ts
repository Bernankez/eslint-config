// eslint-disable-next-line unused-imports/no-unused-imports
import { RuleListener, RuleModule } from "@typescript-eslint/utils/eslint-utils";
import { createESLintRule, defineTemplateBodyVisitor, getESLintCoreRule, isInsideMustache } from "../utils";

const baseRule = getESLintCoreRule("quotes");

export const RULE_NAME = "mustache-interpolation-quotes";
export type MessageIds = "wrongQuotes";
export type Options = [quotes: "double" | "single" | "backtick", options?: { avoidEscape?: boolean; allowTemplateLiterals?: boolean }];

export default createESLintRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: "layout",
    docs: {
      description: "Enforce the consistent use either backticks, double, or single quotes inside Vue template mustache",
      recommended: "stylistic",
      extendsBaseRule: true,
    },
    fixable: "code",
    hasSuggestions: baseRule.meta.hasSuggestions,
    schema: [
      {
        type: ["string"],
        enum: ["double", "single", "backtick"],
      },
      {
        type: "object",
        properties: {
          avoidEscape: {
            type: "boolean",
          },
          allowTemplateLiterals: {
            type: "boolean",
          },
        },
        additionalProperties: false,
      },
    ],
    messages: baseRule.meta.messages ?? {
      wrongQuotes: "Strings must use {{description}}.",
    },
  },
  defaultOptions: ["double", { avoidEscape: true, allowTemplateLiterals: true }],
  create(context) {
    const rules = baseRule.create(context);

    return defineTemplateBodyVisitor(context, {
      Literal(node: any) {
        if (!isInsideMustache(context, node)) { return; }
        return rules.Literal(node);
      },
      TemplateLiteral(node: any) {
        if (!isInsideMustache(context, node)) { return; }
        return rules.TemplateLiteral(node);
      },
    });
  },
});
