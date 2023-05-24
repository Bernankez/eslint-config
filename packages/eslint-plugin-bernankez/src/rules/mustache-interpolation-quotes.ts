import { createESLintRule, defineTemplateBodyVisitor, getESLintCoreRule } from "../utils";

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
      recommended: false,
      extendsBaseRule: true,
    },
    fixable: "code",
    hasSuggestions: baseRule.meta.hasSuggestions,
    schema: [
      {
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
    let isInsideMustache = false;
    const template
      // @ts-expect-error vue-eslint-parser
      = context.parserServices.getTemplateBodyTokenStore
      // @ts-expect-error vue-eslint-parser
      && context.parserServices.getTemplateBodyTokenStore();

    return defineTemplateBodyVisitor(context, {
      Literal(node: any) {
        if (!isInsideMustache) { return; }
        return rules.Literal(node);
      },
      TemplateLiteral(node: any) {
        if (!isInsideMustache) { return; }
        return rules.TemplateLiteral(node);
      },
      "VExpressionContainer[expression!=null]": function (node) {
        const openBrace = template.getFirstToken(node);
        const closeBrace = template.getLastToken(node);

        if (
          !openBrace
          || !closeBrace
          || openBrace.type !== "VExpressionStart"
          || closeBrace.type !== "VExpressionEnd"
        ) {
          return;
        }
        isInsideMustache = true;
      },
    });
  },
});
