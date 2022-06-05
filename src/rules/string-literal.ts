import type { Rule } from 'eslint';

import isGlobal from '../helpers/isGlobal';
import isStringLiteral from '../helpers/isStringLiteral';

const rule: Rule.RuleModule = {
  create: (context) => {
    return {
      CallExpression(node) {
        let { callee } = node;
        let checkCallSignature = (expr: string) => {
          let args = node.arguments;
          if (!args[0]) {
            context.report({
              node,
              message: `${expr} must take at least one argument.`,
            });
            return;
          }
          let arg = args[0];
          if (!isStringLiteral(arg)) {
            context.report({
              node: arg,
              message: `First argument to ${expr} must be a string literal.`,
            });
          }
        };
        if (callee.type === 'Identifier' && callee.name === 't') {
          if (isGlobal(context, 't')) {
            checkCallSignature('t()');
          }
        } else if (
          callee.type === 'MemberExpression' &&
          callee.object.type === 'Identifier' &&
          callee.object.name === 't' &&
          callee.property.type === 'Identifier' &&
          callee.property.name === 'frag'
        ) {
          if (isGlobal(context, 't')) {
            checkCallSignature('t.frag()');
          }
        }
      },
    };
  },
};

export default rule;
