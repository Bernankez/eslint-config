import { extname } from "node:path";
import type { RuleContext, RuleListener } from "@typescript-eslint/utils/dist/ts-eslint";
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
