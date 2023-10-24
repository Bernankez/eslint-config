import { extname } from "node:path";
import type { RuleContext, RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { Rule } from "eslint";

export interface TemplateListener
  extends Record<string, ((node: any) => void) | undefined>,
  Rule.NodeListener {
  [key: string]: ((node: any) => void) | undefined;
}

export function defineTemplateBodyVisitor<TMessageIds extends string, TOptions extends readonly unknown[]>(context: RuleContext<TMessageIds, TOptions>, templateBodyVisitor: TemplateListener, scriptVisitor?: RuleListener, options?: { templateBodyTriggerSelector: "Program" | "Program:exit" }): RuleListener {
  // @ts-expect-error vue custom defined prop
  if (context.parserServices.defineTemplateBodyVisitor == null) {
    const filename = context.getFilename();
    if (extname(filename) === ".vue") {
      context.report({
        loc: { line: 1, column: 0 },
        // @ts-expect-error custom error message
        message:
          "Use the latest vue-eslint-parser. See also https://eslint.vuejs.org/user-guide/#what-is-the-use-the-latest-vue-eslint-parser-error.",
      });
    }
    return {};
  }
  // @ts-expect-error vue custom defined prop
  return context.parserServices.defineTemplateBodyVisitor(templateBodyVisitor, scriptVisitor, options);
}

export function isInsideMustache<TMessageIds extends string, TOptions extends readonly unknown[]>(context: RuleContext<TMessageIds, TOptions>, node: any) {
  if (node.parent) {
    if (node.parent.type === "VExpressionContainer") {
      const template
        // @ts-expect-error vue-eslint-parser
        = context.parserServices.getTemplateBodyTokenStore
        // @ts-expect-error vue-eslint-parser
        && context.parserServices.getTemplateBodyTokenStore();

      const openBrace = template.getFirstToken(node.parent);
      const closeBrace = template.getLastToken(node.parent);

      if (
        !openBrace
        || !closeBrace
        || openBrace.type !== "VExpressionStart"
        || closeBrace.type !== "VExpressionEnd"
      ) {
        return false;
      }
      return true;
    }
    return isInsideMustache(context, node.parent);
  }
  return false;
}
