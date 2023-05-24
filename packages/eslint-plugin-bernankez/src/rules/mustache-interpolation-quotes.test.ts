import { RuleTester } from "@typescript-eslint/utils/dist/ts-eslint";
import { it } from "vitest";
import rule, { RULE_NAME } from "./mustache-interpolation-quotes";

const valids = [
  {
    code: "<template>{{'test'}}</template>",
    options: ["single"],
  },
  {
    code: "<template>{{fn('')}}</template>",
    options: ["single"],
  },
  {
    code: "<template>{{fn(\"\")}}</template>",
    options: ["double"],
  },
  {
    code: "<template>{{fn(``)}}</template>",
    options: ["backtick"],
  },
] as const;
const invalids = [
  {
    code: "<template>{{fn('')}}</template>",
    options: ["double"] as const,
    output: "<template>{{fn(\"\")}}</template>",
    errors: [
      {
        messageId: "wrongQuotes" as const,
        data: {
          description: "doublequote",
        },
      },
    ],
  },
  {
    code: "<template>{{fn(\"\")}}</template>",
    options: ["single"] as const,
    output: "<template>{{fn('')}}</template>",
    errors: [
      {
        messageId: "wrongQuotes" as const,
        data: {
          description: "singlequote",
        },
      },
    ],
  },
  {
    code: "<template>{{\"\"}}</template>",
    options: ["backtick"] as const,
    output: "<template>{{``}}</template>",
    errors: [
      {
        messageId: "wrongQuotes" as const,
        data: {
          description: "backtick",
        },
      },
    ],
  },
];

it("runs", () => {
  const ruleTester: RuleTester = new RuleTester({
    parser: require.resolve("vue-eslint-parser"),
  });

  ruleTester.run(RULE_NAME, rule, {
    valid: valids,
    invalid: invalids,
  });
});