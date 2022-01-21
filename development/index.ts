/*
 * @creator      : JAYNE·CHEN
 * @since        : 2021/10/20 12:38:12 +0800
 * @filePath     : /development/index.ts
 * @lastEditors  : JAYNE·CHEN
 * @updated      : 2022/01/21 18:39:02 +0800
 * @description  : 调试模块入口文件
 */

// import "./type";
// import "./uri";

import request, { Requests } from '../packages/requests/src/requests';

// console.log('request::', request);

const local = new Requests({
  host: "//127.1.0.1:5566/aaa/s/",
  pathname: './api',
  timeout: 1,
});

// console.log('local::', local);

local.get('./static/api.mock.json?b=2', { a: 1 }, {timeout: 2}).then((response) => {
  console.log(response);
}).catch((err) => {
  console.error(err.code, err.message);
});
