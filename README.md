# eslint-config

This config internal use antfu's eslint config, and has a default config to merge with user's config.
See [createDefaultOptions](https://github.com/Bernankez/eslint-config/blob/v4/src/index.ts#L18) for detailed default config.
https://github.com/Bernankez/eslint-config/blob/v4/src/index.ts#L18

> From v4, this config re-exports antfu's eslint config, with default options.
> Before v4, this config was forked from antfu's eslint config. V4与之前版本可能有一些规则上的差异
> From v3, drop cjs build
> From v2, requires ESLint v9.5+
> From v1, support ESLint flat config
> For legacy eslint config, use v0.x

## TODOs

- [ ] WIP:Unit tests & fixtures

- [ ] CLI navigate

- [ ] Specify `engine` field in package.json

- [ ] LICENSE file

- [x] prepare in package.json script

- [ ] CI & release(changelogithub) workflows
