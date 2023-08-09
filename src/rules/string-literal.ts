import type { Rule } from 'eslint';

import { isStringLiteral } from '../helpers/isStringLiteral';
import { isFromValidSource } from '../helpers/isFromValidSource';

const rule: Rule.RuleModule = {
  meta: {
    schema: [
      {
        type: 'object',
        properties: {
          propNames: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create: (context) => {
    const options = context.options[0] || {};
    const propNames: Array<string> = options.propNames || ['jsx', 'frag'];

    return {
      CallExpression(node) {
        const { callee } = node;
        const checkCallSignature = (expr: string) => {
          const args = node.arguments;
          if (!args[0]) {
            context.report({
              node,
              message: `${expr} must take at least one argument.`,
            });
            return;
          }
          const arg = args[0];
          if (!isStringLiteral(arg)) {
            context.report({
              node: arg,
              message: `First argument to ${expr} must be a string literal.`,
            });
          }
        };
        if (callee.type === 'Identifier' && callee.name === 't') {
          if (isFromValidSource(context, 't')) {
            checkCallSignature('t()');
          }
        } else if (callee.type === 'MemberExpression') {
          const object = callee.object;
          if (object.type === 'Identifier' && object.name === 't') {
            if (isFromValidSource(context, 't')) {
              const property = callee.property;
              if (property.type === 'Identifier') {
                for (const propName of propNames) {
                  if (property.name === propName) {
                    checkCallSignature(`t.${propName}()`);
                  }
                }
              }
            }
          }
        }
      },
    };
  },
};

export default rule;
