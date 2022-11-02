# @bernankez/eslint-config
[![npm](https://img.shields.io/npm/v/@bernankez/eslint-config?color=green&label=npm)](https://www.npmjs.com/package/@bernankez/eslint-config)

extends [antfu/eslint-config](https://github.com/antfu/eslint-config)

- **Double quotes, with semi**
- Auto fix for formatting (aimed to be used standalone without Prettier)
- Designed to work with TypeScript, Vue out-of-box
- Lint also for json, yaml, markdown
- Sorted imports, dangling commas for cleaner commit diff
- Reasonable defaults, best practices, only one-line of config

## Usage

### Install

```bash
pnpm add -D eslint @bernankez/eslint-config
```

### Install [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and create Config `.eslintrc.json`

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

Create `.vscode/settings.json`

```json
{
  "prettier.enable": false,
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```
