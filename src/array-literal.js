const isGlobal = require('./helpers/isGlobal');
const isStringLiteral = require('./helpers/isStringLiteral');

module.exports = {
  create: (context) => {
    return {
      CallExpression(node) {
        let { callee } = node;
        let checkCallSignature = (expr) => {
          let args = node.arguments;
          if (!args || args.length === 0) {
            context.report({
              node,
              message: `${expr} must take at least one argument.`,
            });
            return;
          }
          let arg = args[0];
          if (arg.type !== 'ArrayExpression' || arg.elements.length !== 2) {
            context.report({
              node: arg,
              message: `First argument to ${expr} must be an array literal of length 2.`,
            });
            return;
          }
          for (let node of arg.elements) {
            if (!isStringLiteral(node)) {
              context.report({
                node,
                message: 'Array element must be a string literal.',
              });
            }
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
