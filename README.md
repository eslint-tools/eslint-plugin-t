# eslint-plugin-t

This plugin contains lint rules related to internationalization, particularly for strings wrapped in `t()`.

## Installation

1. Add `eslint-plugin-t` to your devDependencies.

2. Add `t` to the `plugins` section of your ESLint configuration.

```json
{
  "plugins": ["t"]
}
```

3. Enable the rule(s) that you want ESLint to enforce.

```json
{
  "rules": {
    "t/string-literal": "warn"
  }
}
```

## Rules

There's currently just one lint rule in this package.

**string-literal**

This rule enforces that the first argument to `t()` is a string literal. This is useful if you intend to [statically extract](https://www.i18next.com/overview/plugins-and-utils#extraction-tools) language strings because static tooling [can't evaluate expressions](https://github.com/i18next/i18next-parser#caveats).

Example:

```ts
// Correct usage (no lint warning)
alert(t('Hello World!'));

// Incorrect usage (raises lint warning)
alert(t('Hello ' + Math.random().toString()));
```
