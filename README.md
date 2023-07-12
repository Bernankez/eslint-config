# @bernankez/eslint-config

[![npm](https://img.shields.io/npm/v/@bernankez/eslint-config?color=red&label=npm)](https://www.npmjs.com/package/@bernankez/eslint-config)

This repository was originally forked from [antfu/eslint-config](https://github.com/antfu/eslint-config) and modified to fit my own preferences.

- Double quotes, with semi
- Auto fix for formatting (aimed to be used standalone **without** Prettier)
- Designed to work with TypeScript, Vue out-of-box
- Lint also for json, yaml, markdown
- Sorted imports, dangling commas
- Reasonable defaults, best practices, only one-line of config

## Usage

### Install

```bash
pnpm add -D eslint @bernankez/eslint-config
```

### Config `.eslintrc.json`

```json
{
  "extends": "@bernankez"
}
```

> You don't need `.eslintignore` normally as it has been provided by the preset.

### Add script for package.json

For example:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

### Config VS Code auto fix

Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and create `.vscode/settings.json` or add it to your global settings

```json
{
  "prettier.enable": false,
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  // auto lint on save for specific file types
  "eslint.probe": [
    "javascript",
    "typescript",
    "javascriptreact",
    "typescriptreact",
    // including vue if you want to format vue files
    "vue",
    "html",
    "markdown",
    "json",
    "jsonc",
    "json5"
  ]
}
```

### TypeScript Aware Rules

Type aware rules are enabled when a `tsconfig.eslint.json` is found in the project root, which will introduce some stricter rules into your project. If you want to enable it while have no `tsconfig.eslint.json` in the project root, you can change tsconfig name by modifying `ESLINT_TSCONFIG` env. 

```js
// .eslintrc.js
process.env.ESLINT_TSCONFIG = "tsconfig.json";

module.exports = {
  extends: "@bernankez"
};
```

### Lint Staged

If you want to apply lint and auto-fix before every commit, you can add the following to your `package.json`:

```json
{
  "simple-git-hooks": {
    "pre-commit": "pnpm lint-staged"
  },
  "lint-staged": {
    "*": "eslint --fix"
  }
}
```

and then

```bash
pnpm add -D lint-staged simple-git-hooks
```

### Stylelint
I share the same view with antfu concerning Prettier: [Why I don't use Prettier](https://antfu.me/posts/why-not-prettier). However, since I also have a need to format CSS, here’s my own [stylelint-config](https://github.com/Bernankez/stylelint-config).
