import { hasInvalidEOF as _hasInvalidEOF, createESLintRule, defineTemplateBodyVisitor, getESLintCoreRule } from "../utils";

const baseRule = getESLintCoreRule("quotes");

export const RULE_NAME = "mustache-interpolation-quotes";
export type MessageIds = "wrongQuotes";
export type Options = [quotes:"double" | "single" | "backtick", options?:{ avoidEscape?: boolean }];

export default createESLintRule<Options, MessageIds>({
  name: RULE_NAME,
  meta: {
    type: "layout",
    docs: {
      description: "Enforce the consistent use either backticks, double, or single quotes inside Vue template",
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
        },
        additionalProperties: false,
      },
    ],
    messages: baseRule.meta.messages ?? {
      wrongQuotes: "Strings must use {{description}}.",
    },
  },
  defaultOptions: ["double", { avoidEscape: true }],
  create(context, [option = "double", { avoidEscape }]) {
    const rules = baseRule.create(context);
    const sourceCode = context.getSourceCode();
    const double = option === "double";
    const single = option === "single";
    const quoteChar = double ? "\"" : "'";
    const quoteName = double ? "doublequotes" : single ? "singlequotes" : "backtick";
    let hasInvalidEOF: boolean;

    return defineTemplateBodyVisitor(context, {
      "VExpressionContainer[expression!=null]": function (node) {
        if (hasInvalidEOF) {
          return;
        }

        if (node.expression.type === "Literal") {
          return rules.Literal(node.expression);
        }
      },
    },
    {
      Program(node) {
        hasInvalidEOF = _hasInvalidEOF(node);
      },
    },
    );
  },
});
