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

Currently there's only one rule.

**string-literal**

Ensures that only a string literal can be passed as the first argument to `t()`.

Example:

```ts
// Correct usage (no lint warning)
alert(t('Hello World!'));

// Incorrect usage (raises lint warning)
alert(t('Hello' + name + '!'));
```
