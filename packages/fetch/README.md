# `@trz/fetch`

> TODO: description

## Usage

```
const fetch = require('@trz/fetch');

// TODO: DEMONSTRATE API
```

```ts
import http, { FetchRequest } from '@trz/fetch';

/**
 * GET 方法使用
 */
http.GET('//example.com/biz.alias/version.code/interface_name?filterKey=filterValue&extraKey=extraValue');
http.GET('//example.com/biz.alias/version.code/interface_name', {
  headers: {
    "x-custom-header": "custom value"
  },
  
  body: {
    filterKey: "filterValue",
    extraKey: "extraValue"
  }
})

```

## 使用定制的请求实例

```ts
import { FetchRequest } from '@trz/fetch';

const api = new FetchRequest({
  domain: "//example.com/biz.alias",
  bizName: "/bizName/subBizName",
  // queryString: "filterKey=filterValue&extraKey=extraValue"
  queryString: {}
});


api.GET('/version.code/interface.name?filterKey=filterValue&extraKey=extraValue');

```
