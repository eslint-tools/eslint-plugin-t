import type { Rule, Scope } from 'eslint';

type RuleContext = Rule.RuleContext;
type Scope = Scope.Scope;

export default function isGlobal(context: RuleContext, identifierName: string) {
  let scope: Scope | null = context.getScope();
  while (scope && scope.type !== 'global') {
    if (scope.set.has(identifierName)) {
      return false;
    }
    scope = scope.upper;
  }
  return true;
}
