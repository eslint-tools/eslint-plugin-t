const isStringLiteral = require('./helpers/isStringLiteral');

module.exports = {
  create: (context) => {
    return {
      CallExpression(node) {
        let { callee } = node;
        if (callee.type === 'Identifier' && callee.name === 't') {
          let scope = context.getScope();
          while (scope && scope.type !== 'global') {
            if (scope.set.has('t')) {
              // t is not global
              return;
            }
            scope = scope.upper;
          }
          let args = node.arguments;
          if (!args || args.length === 0) {
            context.report({
              node,
              message: 't() must take at least one argument.',
            });
            return;
          }
          let arg = args[0];
          if (arg.type !== 'ArrayExpression' || arg.elements.length !== 2) {
            context.report({
              node: arg,
              message:
                'First argument to t() must be an array literal of length 2.',
            });
          }
          for (let node of arg.elements) {
            if (!isStringLiteral(node)) {
              context.report({
                node,
                message: 'Array element must be a string literal.',
              });
            }
          }
        }
      },
    };
  },
};
