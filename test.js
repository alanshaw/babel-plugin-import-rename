const test = require('tape')
const babel = require('babel-core')

test('Should replace correctly', (t) => {
  t.plan(2)

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
  t.ok(result.code.indexOf("'./Foo'") > -1, 'Foo was renamed')
  t.end()
})
