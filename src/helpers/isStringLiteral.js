function isStringLiteral(node) {
  // Not a literal
  if (node.type !== 'Literal' && node.type !== 'TemplateLiteral') {
    return false;
  }
  // Non-string literal
  if (node.type === 'Literal' && typeof node.value !== 'string') {
    return false;
  }
  // Template literal with expressions
  if (node.type === 'TemplateLiteral' && node.expressions.length) {
    return false;
  }
  return true;
}

module.exports = isStringLiteral;
