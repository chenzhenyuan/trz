# `@trz/requests`

> TODO: description

## 安装

```zsh
npm install @trz/requests

# 或者

yarn add @trz/requests
```

## 引入包

引用 `Requests` 包
```ts
import { Requests } from '@trz/requests';

/* 或者 */

const { Requests } = require("@trz/requests");
```


## 接口说明

### 使用默认实例


```ts
import requests from '@trz/requests';

// Get 请求
requests.get('//example.domian.com/api/interface');

requests.get('//example.domian.com/api/interface?params=string&search=someone');

requests.get('//example.domian.com/api/interface?params=string', {"search": "someone"});

// POST、PUT、DELETE、PATCH

requests.post(
  '//example.domian.com/api/interface?params=string',
  {
    "body": "something"
  },
  {
    searchParame: "111",
    body: {} || new FormData()
  }
);
```

- GET 请求：
  1. __*Requests.prototype.get(`url`: string)*__
  2. __*Requests.prototype.get(`url`: string, `searchParams`?: string | Dictionary)*__
  3. __*Requests.prototype.get(`url`: string, `searchParams`?: string | Dictionary, `requestOptions`?: RequestConfigsInterface)*__
  
  <br />
  
  参数 | 类型 | 默认值 | 说明
  :- | :- | :-: | -
  url | string | - | -
  searchParams | string \| {[key: string]: unkonw} | {} | -
  requestOptions | RequestConfigsInterface | - | 参考底部 `RequestConfigsInterface` 说明


  示例：
  
    ```ts
    import requests from '@trz/requests';
    
    requests.get('//example.domain.com/apis/interface');
    /*
    * GET  https://example.domain.com/apis/interface
    * accept: text/*;q=0.99
    * accept-encoding: gzip, deflate, br
    * content-type: application/json;charset=UTF-8
    * x-request-client: TrzRequests/0.1.0
    */
    
    
    
    requests.get('//example.domain.com/apis/interface', {search: 'something'});
    /*
    * GET  https://example.domain.com/apis/interface?search=something
    * accept: text/*;q=0.99
    * accept-encoding: gzip, deflate, br
    * content-type: application/json;charset=UTF-8
    * x-request-client: TrzRequests/0.1.0
    */
    
    ```


- POST 请求：Requests.prototype.post
  1. __*Requests.prototype.post(`url`: string)*__
  2. __*Requests.prototype.post(`url`: string, `requestBody`?: string | Dictionary)*__
  3. __*Requests.prototype.post(`url`: string, `requestBody`?: string | Dictionary, `requestOptions`?: RequestConfigsInterface)*__

  <br />
  
  参数 | 类型 | 默认值 | 说明
  :- | :- | :-: | -
  url | string | - | -
  searchParams | string \| {[key: string]: unkonw} | {} | -
  requestOptions | RequestConfigsInterface | - | 参考底部 `RequestConfigsInterface` 说明

  示例：
  ```ts
  import requests from '@trz/requests';
  
  requests.post('//example.domain.com/apis/interface', {
    requestTraceLogId: '****-****-********',
  });
  ```


- PUT、DELETE、PATCH 参考 POST
<!-- #-post-请求requestsprototypepost -->

### 创建私有实例

- 示例：

  ```ts
  import { Request } from '@trz/requests';

  const requestConfigs: RequestConfigsInterface = {
    host         : "//example.domain.com/api/v2/"
    withUserAuth : true,
    timeout      : 30,
    body         : { "traceId": 12345678 },
    searchParams : { "version": "1.0.0" },
    headers      : { "Content-Type": "application/json;charset=utf8" },
  };

  const api: RequestsInterface = new Requests( requestConfigs );

  api.get('./interface').then((response) => {
    return response;
  });
  
  api.get('./interface', { search: 'something', params: 'something' }).then((response) => {
    return response;
  });

  api.post('./interface', {}).then((rsp) => rsp);

  api.post('./interface', { bodyKey: 1234 }, { timeout: 10 }).then((response) => {
    return response;
  }).catch((responseErr) => {
    return Promise.reject(responseErr);
  })
  ```


---

#### *RequestConfigsInterface* 说明：

  配置名称 | 取值类型 | 配置描述 | 默认值 |
  :-: | :- | :- | :-
  host | string | 统一主机的地址 | https://example.domain.com/api/v2/
  withUserAuth | boolean \| "include" \| "omit" \| "same-origin" | 是否携带授权标识 | true
  timeout | number \| string | 客户端的请求超时时长（单位秒） | 30
  headers | string[][] |  请求头配置，参考 `Headers` | -
  searchParams | string \| Record\<string, any\> | 通用请求查询参数 | -
  body | string \| number \| FormData \| Record\<string, any\> \| null | 通用请求体 | -

