module.exports = function (babel) {
  var t = babel.types

  function createRegexs (opts) {
    if (opts._regexs) return opts
    var regexs = {}
    Object.keys(opts).forEach(function (k) { regexs[k] = new RegExp(k) })
    opts._regexs = regexs
    return opts
  }

  const sourceVisitor = {
    Literal (path) {
      if (!this.opts) return

      var opts = createRegexs(this.opts)
      var keys = Object.keys(opts._regexs)

      for (var i = 0; i < keys.length; i++) {
        var regex = opts._regexs[keys[i]]
        if (regex.test(path.node.value)) {
          var replacement = path.node.value.replace(regex, opts[keys[i]])
          path.replaceWith(t.stringLiteral(replacement))
          return
        }
      }
    }
  }

  return {
    visitor: {
      ImportDeclaration: function (path, state) {
        path.traverse(sourceVisitor, state)
      }
    }
  }
}
