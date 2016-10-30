module.exports = function (babel) {
  var t = babel.types

  function createRegexs (opts) {
    return Object.keys(opts).map(function (k) {
      const regexp = new RegExp(k)
      return {
        regexp: regexp,
        replace: opts[k]
      }
    })
  }

  function replaceIfNeeded (path, regexps) {
    if (!path || !path.node) return

    regexps.some(function (v) {
      var regexp = v.regexp
      if (regexp.test(path.node.value)) {
        var replacement = path.node.value.replace(regexp, v.replace)
        path.replaceWith(t.stringLiteral(replacement))
        return true
      }
    })
  }

  return {
    visitor: {
      Program (path, state) {
        const opts = state.opts
        if (!opts) return

        const regexps = createRegexs(opts)

        path.traverse({
          ImportDeclaration: function (path) {
            replaceIfNeeded(path.get('source'), regexps)
          },
          ExportNamedDeclaration: function (path) {
            replaceIfNeeded(path.get('source'), regexps)
          }
        }, state)
      }
    }
  }
}
