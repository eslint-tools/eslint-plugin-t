function isGlobal(context, identifierName) {
  let scope = context.getScope();
  while (scope && scope.type !== 'global') {
    if (scope.set.has(identifierName)) {
      return false;
    }
    scope = scope.upper;
  }
  return true;
}

module.exports = isGlobal;
