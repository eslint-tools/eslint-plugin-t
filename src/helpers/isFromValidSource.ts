import type { Rule, Scope } from 'eslint';

type RuleContext = Rule.RuleContext;
type Scope = Scope.Scope;

/**
 * Checks to ensure that the source (where it is defined) of the given variable
 * is one of the following:
 * - An import, e.g. `import { t } from 'i18next'`
 * - A React hook, e.g. `const { t } = useTranslation()`
 * - A global
 */
export function isFromValidSource(
  context: RuleContext,
  identifierName: string,
) {
  const scope = getScopeForIdentifier(context.getScope(), identifierName);
  if (!scope || scope.type === 'global') {
    return true;
  }
  const variable = scope.set.get(identifierName);
  const def = variable?.defs[0];
  if (def) {
    if (def.type === 'ImportBinding') {
      // TODO: Check `def.parent.source.value` (which is the package name, e.g.
      // 'i18next') against a configurable allowlist
      return true;
    }
    if (def.type === 'Variable') {
      const node = def.node;
      // Something like `const foo = ...`
      if (node.type === 'VariableDeclarator') {
        const init = node.init;
        // Something like `const foo = bar()`
        if (init?.type === 'CallExpression') {
          const callee = init.callee;
          if (callee.type === 'Identifier') {
            // TODO: Check hook name against a configurable allowlist
            const isHook = callee.name.match(/^use[A-Z]/);
            if (isHook) {
              return true;
            }
          }
        }
      }
    }
  }
  return false;
}

function getScopeForIdentifier(scope: Scope | null, identifierName: string) {
  while (scope) {
    if (scope.set.has(identifierName)) {
      return scope;
    }
    scope = scope.upper;
  }
  return null;
}
