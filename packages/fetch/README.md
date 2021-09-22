# `@trz/fetch`

> TODO: description

## 安装

```zsh
npm install @trz/fetch

# 或者

yarn add @trz/fetch
```

## 使用

```ts
import http, { FetchRequest } from '@trz/fetch';
// 或者 `es5` 的引用方式
// const http = require('@trz/fetch');

http.[REQUSET_METHOD]('URL', REQUSET_CONFIGS);

/** GET 方法 */
http.GET('//example.com/biz.alias/version.code/interface_name?filterKey=filterValue&extraKey=extraValue');

http.GET('//example.com/biz.alias/version.code/interface_name', {
  headers: {
    "x-custom-header": "custom value"
  },
  
  params: {
    filterKey: "filterValue",
    extraKey: "extraValue"
  }
});
```

## 使用定制的请求实例

```ts
import { fetch } from '@trz/fetch';

const api = new fetch({
  domain: "//example.com/biz.alias",
  bizName: "/bizName/subBizName",
  // queryString: "filterKey=filterValue&extraKey=extraValue"
  params: {
    'search_param_a': 'search_value_a',
    'search_param_b': 'search_value_b',
  },
  body: {
    'body_a': 'value_a',
    'body_b': 'value_b',
  }
});


api.GET('/version.code/interface.name?filterKey=filterValue&extraKey=extraValue');

```
