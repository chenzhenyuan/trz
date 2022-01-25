/*
 * @creator      : JAYNE·CHEN
 * @since        : 2021/10/20 12:38:12 +0800
 * @filePath     : /development/index.ts
 * @lastEditors  : JAYNE·CHEN
 * @updated      : 2022/01/25 13:51:04 +0800
 * @description  : 调试模块入口文件
 */

// import "./type";
// import "./uri";

import requestCore, { RequestsError } from '../packages/requests/src/core';
import request, { Requests } from '../packages/requests/src/requests';
import Serialize from '../packages/uri/node_modules/@trz/serialize';

// console.log('request::', request);

const requestBody = {
    "appType": "WEB",
    "traceLogId": "1620618244737",
    "roleType": "STAFF",
    "loginId": "18616680110",
    "password": "666666"
};

const shantai = new Requests({
  timeout: -1,
  withUserAuth: true,
  host: "//api.dev.shantaijk.cn/api/",
  searchParams: { x: 'x', y: 'y', z: 'y'},
  body: { unik: 456789 }
});

// console.log('github api::', shantai);
// shantai.post('./cif-login/cif/loginService/login', requestBody).then((response) => {
//   console.log(response);
// }).catch((err: RequestsError) => {
//   console.error(err);
// });

requestCore({
  method: "POST",
  url: '//api.test.shantaijk.cn/api/cif-login/cif/loginService/login?b=2',
  searchParams: new Serialize('j=344'),
  body: requestBody,
}).then((resp) => {
  console.log(typeof resp, resp.length);
})
