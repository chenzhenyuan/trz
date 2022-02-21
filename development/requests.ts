/*
 * @creator      : JAYNE·CHEN
 * @since        : 2022/02/14 14:03:53 +0800
 * @filePath     : /development/requests.ts
 * @lastEditors  : JAYNE·CHEN
 * @updated      : 2022/02/18 16:10:57 +0800
 * @description  : file content
 */




import requestCore, { RequestsError } from '../packages/requests/src/core';
import request, { Requests } from '../packages/requests/src/requests';

// console.log('request::', request);

const requestBody = {
    "appType": "WEB",
    // "traceLogId": Date.now(),
    "roleType": "STAFF",
    "loginId": "18616680110",
    "password": "666666"
};

const shantai = new Requests({
  host: "https://api.dev.shantaijk.cn/api/",
  // withUserAuth: true,
  // searchParams: { x: 'x', y: 'y', z: 'y' },
  // body: '{ "unikey": "456789", "traceLogId": 1234 }',
  headers: {
    // 'Content-Type': 'application/json;charset=UTF-8',
  }
});

console.log("shantai 实例：", shantai);

shantai.post('./cif-login/cif/loginService/login?sss=3333', requestBody, { searchParams: {a: 1234} });

const api = new Requests({
  headers: [["content-type", "text/xml;charset=gb2312"]],
  body: { a: 123 }
});

api.get("aaa", { a: 'aaaa' }, {
  searchParams: { ca: 'bbbb' },
  headers: {
    "content-type": "ssss"
  }
}).catch((err) => {
  console.dir(err);
})

// const kk = requestCore({
//   method: "POST",
//   url: '//api.dev.shantaijk.cn/api/cif-login/cif/loginService/login?v=1.0.0',
//   searchParams: 'j=1',
//   body: requestBody,
//   withUserAuth: true,
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': ['application/json;charset=utf8', 'text/*;charset=utf8'],
//   }
// }).then((resp) => {
//   console.log(typeof resp, resp);
// });
