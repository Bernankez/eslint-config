# @bernankez/eslint-config [![npm](https://img.shields.io/npm/v/@bernankez/eslint-config?color=c14344&label=npm)](https://npmjs.com/package/@bernankez/eslint-config)

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

> [!NOTE]
> This config internally uses antfu's ESLint config with some of my default settings. To see the differences in the default rules, please refer to [this file](https://github.com/Bernankez/eslint-config/blob/master/src/index.ts#L18).
>
> For detailed configurations, directly check [antfu's ESLint config](https://github.com/antfu/eslint-config#readme).
>
> When calling `npx @bernankez/eslint-config`, all params are passed through **as-is** to `@antfu/eslint-config`.

> [!IMPORTANT]
> From v4, the internal implementation of this config has changed. It now re-exports antfu's ESLint config along with some of my default settings. This may result in differences in certain ESLint rules compared to previous versions. Please take note.
>
> v3 dropped the cjs build.
>
> From v2, ESLint v9.5 or higher is required.
>
> From v1, ESLint flat config is supported.
>
> For legacy ESLint config, please use v0.x

## License

[MIT](https://github.com/Bernankez/eslint-config/blob/master/LICENSE) License © 2022-PRESENT [科科Cole](https://github.com/Bernankez)
