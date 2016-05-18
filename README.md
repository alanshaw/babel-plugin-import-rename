# babel-plugin-import-rename [![Build Status](https://img.shields.io/travis/alanshaw/babel-plugin-import-rename/master.svg)](https://travis-ci.org/alanshaw/babel-plugin-import-rename) [![Dependency Status](https://david-dm.org/alanshaw/babel-plugin-import-rename.svg)](https://david-dm.org/alanshaw/babel-plugin-import-rename)

Rename import sources with a RegExp like a boss.

## Example

Maybe you want to remove `.jsx` extension from compiled files:

**input.js**
```js
import Foo from './Foo.jsx'
```

**.babelrc**
```json
{
  "presets": ["react", "es2015"],
  "plugins": [
    ["import-rename", {"^(.*)\\.jsx$": "$1"}]
  ]
}
```

**output.js**
```js
'use strict';
var _Foo = require('./Foo');
var _Foo2 = _interopRequireDefault(_Foo);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
```

## Usage

Specify sources and replacements as plugin options. Option keys are strings passed directly to the RegExp constructor for matching against import sources in your code. Option values are the replacements.

### Via .babelrc (recommended)

```json
{
  "plugins": [[
    "import-rename", {
      "regex1": "replacement1",
      "regex2": "replacement2"
    }
  ]]
}
```

### Via Node API

```js
require('babel-core').transform('code', {
  plugins: [[
    'import-rename', {
      'regex1': 'replacement1',
      'regex2': 'replacement2'
    }
  ]]
})
```

---

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
