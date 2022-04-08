/*
 * @creator      : JAYNE·CHEN
 * @since        : 2022/04/09 04:01:21 +0800
 * @filePath     : /packages/hooks/.babelrc.js
 * @lastEditors  : JAYNE·CHEN
 * @updated      : 2022/04/09 04:12:19 +0800
 * @description  :
 */

const fs = require('fs');
const path = require('path');
const JSON = require('json5');

const babelrc = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../.babelrc')).toString())

babelrc.presets.push(["minify"]);

module.exports = babelrc;
