# @bernankez/eslint-config

[![npm](https://img.shields.io/npm/v/@bernankez/eslint-config?color=red&label=npm)](https://www.npmjs.com/package/@bernankez/eslint-config)

> [!IMPORTANT]
> This repository was originally forked from [@antfu/eslint-config](https://github.com/antfu/eslint-config), but may not be kept up to date with the latest changes and will eventually evolve into my own version. Some rules were modified to fit my own preferences.

### Changes in this fork

- Double quotes, with semi
- Brace style: `1tbs`
- Curly: `all`
- HTML self closing: `<div></div>` `<img />` `<MyComponent />`
- React support becomes built-in and auto-detected

## Usage

To set up your project, or migrate from the legacy config to the new flat config

```sh
npx @bernankez/eslint-config@latest
```

### Install

```sh
pnpm install -D eslint @bernankez/eslint-config

#for better output
pnpm install -D eslint-formatter-mo
```

### Create config file

```js
// eslint.config.mjs
import bernankez from "@bernankez/eslint-config";

export default bernankez();
```

Combined with legacy config:

```js
// eslint.config.js
const bernankez = require("@bernankez/eslint-config").default;
const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat();

module.exports = bernankez(
  {
    ignores: [],
  },

  // Legacy config
  ...compat.config({
    extends: [
      "eslint:recommended",
      // Other extends...
    ],
  })

  // Other flat configs...
);
```

> Note that `.eslintignore` no longer works in Flat config, see [customization](#customization) for more details.

### Add script for package.json

For example:

```json
{
  "scripts": {
    "lint": "eslint . -f mo",
    "lint:fix": "eslint . -f mo --fix"
  }
}
```

## VS Code support (auto fix)

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Add the following settings to your `.vscode/settings.json`:

```jsonc
{
  // Disable the default formatter, use eslint instead
  "prettier.enable": false,
  "editor.formatOnSave": false,

  // Auto fix
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "never"
  },

  // Silent the stylistic rules in you IDE, but still auto fix them
  "eslint.rules.customizations": [
    { "rule": "style/*", "severity": "off" },
    { "rule": "format/*", "severity": "off" },
    { "rule": "*-indent", "severity": "off" },
    { "rule": "*-spacing", "severity": "off" },
    { "rule": "*-spaces", "severity": "off" },
    { "rule": "*-order", "severity": "off" },
    { "rule": "*-dangle", "severity": "off" },
    { "rule": "*-newline", "severity": "off" },
    { "rule": "*quotes", "severity": "off" },
    { "rule": "*semi", "severity": "off" }
  ],

  // Enable eslint for all supported languages
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "yaml",
    "toml",
    "xml",
    "gql",
    "graphql",
    "astro",
    "css",
    "less",
    "scss",
    "pcss",
    "postcss"
  ]
}
```

For detailed configurations, please refer to [@antfu/eslint-config](https://github.com/antfu/eslint-config#readme).

## License

[MIT](LICENSE) License © 2022-PRESENT [科科Cole](https://github.com/Bernankez)
