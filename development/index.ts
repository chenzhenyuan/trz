/*
 * @creator      : JAYNE·CHEN
 * @since        : 2021/10/20 12:38:12 +0800
 * @filePath     : /development/index.ts
 * @lastEditors  : JAYNE·CHEN
 * @updated      : 2022/01/26 17:39:51 +0800
 * @description  : 调试模块入口文件
 */

// import "./type";
// import "./uri";


import requestCore, { RequestsError } from '../packages/requests/src/core';
import request, { Requests } from '../packages/requests/src/requests';
import Serialize from '../packages/uri/node_modules/@trz/serialize/src';

// console.log('request::', request);

const requestBody = {
    "appType": "WEB",
    "traceLogId": "1620618244737",
    "roleType": "STAFF",
    "loginId": "18616680110",
    "password": "666666"
};

const shantai = new Requests({
  timeout: 0,
  withUserAuth: true,
  host: "//api.dev.shantaijk.cn/api/",
  searchParams: { x: 'x', y: 'y', z: 'y'},
  body: { unik: 456789 },
  headers: {
    'Content-Type': 'application-x/json;charset=UTF-8',
  }
});

shantai.post('./cif-login/cif/loginService/login', requestBody).then((response) => {
  // console.error(err);
});

const kk = requestCore({
  method: "POST",
  url: '//api.test.shantaijk.cn/api/cif-login/cif/loginService/login?v=1.0.0',
  searchParams: 'j=1',
  body: requestBody,
  headers: {'Content-Type': 'application/json;charset=UTF-8',}
}).then((resp) => {
  console.log(typeof resp, resp);
});
