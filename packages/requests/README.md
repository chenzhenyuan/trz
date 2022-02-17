# `@trz/fetch`

> TODO: description

## 安装

```zsh
npm install @trz/requests

# 或者

yarn add @trz/requests
```

## 使用

引用 `Requests` 包
```ts
import { Requests } from '@trz/requests';

/* 或者 */

const { Requests } = require("@trz/requests");
```


## API

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

### GET 请求：Requests.prototype.get
语法：
> requests.get(url);
> ```ts
> requests.get('//example.domain.com/apis/interface');
> 
> requests.get('//example.domain.com/apis/interface?search=something');
> ```
> requests.get(url, searchParams);
> 
> requests.get(url, searchParams, requestConfigs);


### POST 请求：Requests.prototype.post
语法：
> 
> requests.get(url);
> 
>     requests.get(url, searchParams);
> 
>     requests.get(url, searchParams, requestConfigs);
