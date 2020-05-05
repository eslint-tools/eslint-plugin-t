const stringLiteralRule = require('./string-literal');
const arrayLiteralRule = require('./array-literal');

const rules = {
  'string-literal': stringLiteralRule,
  'array-literal': arrayLiteralRule,
};

module.exports = { rules };
