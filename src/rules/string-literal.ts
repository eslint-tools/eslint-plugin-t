import type { Rule } from 'eslint';

import isGlobal from '../helpers/isGlobal';
import isStringLiteral from '../helpers/isStringLiteral';

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
        if (!isGlobal(context, 't')) {
          return;
        }
        if (callee.type === 'Identifier' && callee.name === 't') {
          checkCallSignature('t()');
        } else {
          for (const propName of propNames) {
            if (
              callee.type === 'MemberExpression' &&
              callee.object.type === 'Identifier' &&
              callee.object.name === 't' &&
              callee.property.type === 'Identifier' &&
              callee.property.name === propName
            ) {
              checkCallSignature(`t.${propName}()`);
            }
          }
        }
      },
    };
  },
};

export default rule;
