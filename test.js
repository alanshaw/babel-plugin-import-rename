const test = require('tape')
const babel = require('babel-core')

test('Should replace imports correctly', (t) => {
  t.plan(11)

  const input = `
import React from 'react'
import Foo from './Foo.jsx'
import defaultMember from "module-name0";
import * as name from "module-name1";
import { member } from "module-name2";
import { member as alias } from "module-name3";
import { member1, member2 } from "module-name4";
import { member3, member4 as alias2 } from "module-name5";
import defaultMember2, { member5 } from "module-name6";
import defaultMember3, * as name1 from "module-name7";
import "module-name8";
`

  const opts = {
    presets: ['es2015'],
    plugins: [[
      'import-rename', {
        '^react$': 'react2',
        '^(.*)\\.jsx$': '$1',
        'module-name([0-9])': 'test$1'
      }
    ]]
  }

  const result = babel.transform(input, opts)

  t.ok(result.code.indexOf("'react2'") > -1, 'react was renamed')
  t.ok(result.code.indexOf("'test0'") > -1, 'module-name0 was renamed')
  t.ok(result.code.indexOf("'test1'") > -1, 'module-name1 was renamed')
  t.ok(result.code.indexOf("'test2'") > -1, 'module-name2 was renamed')
  t.ok(result.code.indexOf("'test3'") > -1, 'module-name3 was renamed')
  t.ok(result.code.indexOf("'test4'") > -1, 'module-name4 was renamed')
  t.ok(result.code.indexOf("'test5'") > -1, 'module-name5 was renamed')
  t.ok(result.code.indexOf("'test6'") > -1, 'module-name6 was renamed')
  t.ok(result.code.indexOf("'module-name6'") === -1, 'module-name6 was renamed')
  t.ok(result.code.indexOf("'test7'") > -1, 'module-name7 was renamed')
  t.ok(result.code.indexOf("'./Foo'") > -1, 'Foo was renamed')
  t.end()
})

test('Should replace exports correctly', (t) => {
  t.plan(11)

  const input = `
export React from 'react'
export Foo from './Foo.jsx'
export defaultMember from "module-name0";
export * as name from "module-name1";
export { member } from "module-name2";
export { member as alias } from "module-name3";
export { member1, member2 } from "module-name4";
export { member3, member4 as alias2 } from "module-name5";
export defaultMember2, { member5 } from "module-name6";
export defaultMember3, * as name1 from "module-name7";

export default { 'react': React };
export { var2 };
`

  const opts = {
    presets: ['es2015'],
    plugins: [
      'transform-export-extensions',
      [
        'import-rename', {
          '^react$': 'react2',
          '^(.*)\\.jsx$': '$1',
          'module-name([0-9])': 'test$1'
        }
      ]
    ]
  }

  const result = babel.transform(input, opts)

  t.ok(result.code.indexOf("'react2'") > -1, 'react was renamed')
  t.ok(result.code.indexOf("'test0'") > -1, 'module-name0 was renamed')
  t.ok(result.code.indexOf("'test1'") > -1, 'module-name1 was renamed')
  t.ok(result.code.indexOf("'test2'") > -1, 'module-name2 was renamed')
  t.ok(result.code.indexOf("'test3'") > -1, 'module-name3 was renamed')
  t.ok(result.code.indexOf("'test4'") > -1, 'module-name4 was renamed')
  t.ok(result.code.indexOf("'test5'") > -1, 'module-name5 was renamed')
  t.ok(result.code.indexOf("'test6'") > -1, 'module-name6 was renamed')
  t.ok(result.code.indexOf("'test7'") > -1, 'module-name7 was renamed')
  t.ok(result.code.indexOf("'module-name6'") === -1, 'module-name6 was renamed')
  t.ok(result.code.indexOf("'./Foo'") > -1, 'Foo was renamed')
  t.end()
})
