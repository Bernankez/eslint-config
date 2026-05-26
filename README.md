# @bernankez/eslint-config [![npm](https://img.shields.io/npm/v/@bernankez/eslint-config?color=c14344&label=npm)](https://npmjs.com/package/@bernankez/eslint-config)

A lightweight wrapper around [@antfu/eslint-config](https://github.com/antfu/eslint-config) with some modified defaults.

## Usage

Install manually:

```sh
pnpm add -D @bernankez/eslint-config
```

Create `eslint.config.mjs` in your project root:

```javascript
import bernankez from "@bernankez/eslint-config";

export default bernankez();
```

### Main changes

- Double quotes, with semi
- Brace style: `stroustrup`
- Curly: `all`
- HTML self closing: `<div></div>` `<img />` `<MyComponent />`

To see the differences in the default rules, refer to [this file](https://github.com/Bernankez/eslint-config/blob/master/src/index.ts#L18). For detailed configurations, check [antfu's ESLint config](https://github.com/antfu/eslint-config#readme).

When calling `npx @bernankez/eslint-config`, all params are passed through **as-is** to `@antfu/eslint-config`.

> [!IMPORTANT]
> Requires ESLint v9.5+. For legacy ESLint config, use v0.x.

## License

[MIT](https://github.com/Bernankez/eslint-config/blob/master/LICENSE) License © 2022-PRESENT [科科Cole](https://github.com/Bernankez)
