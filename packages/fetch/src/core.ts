import type from '@trz/type';



type RequestMethod = 'GET' | 'POST' | 'PUT' | 'UPDATE' | 'DELETE' | 'HEADER' | 'OPTIONS';

enum RequestMethodEnum {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE'
}

export interface FetchConfigs extends RequestInit {
  domain?: '' | string;
  prefix?: '' | string;

  params?: any;

  /**
   * 一个BodyInit对象或null，用于设置请求的主体。
   * 取值类型参考： Blob | BufferSource | FormData | URLSearchParams | string
   */
  body?: BodyInit | null;

  /**
   * 一个字符串，表示该请求将如何与浏览器的缓存互动，以设置请求的缓存。
   * 取值："default" | "force-cache" | "no-cache" | "no-store" | "only-if-cached" | "reload"
   */
  cache?: 'default' | 'force-cache' | 'no-cache' | 'no-store' | 'only-if-cached' | 'reload';

  /**
   * 一个字符串，表示证书是否总是与请求一起发送，从不发送，或者只在发送到同源URL时发送。设置请求的凭证。
   * 取值:
   *    - "omit"       : 默认值，忽略cookie的发送
   *    - "same-origin": 表示cookie只能同域发送，不能跨域发送
   *    - "include"    : cookie既可以同域发送，也可以跨域发送
   */
  credentials?: 'omit' | 'same-origin' | 'include';

  /**
   * 一个字符串，表示请求是否使用CORS，或限制在同源的URL上。设置请求的模式
   */
  mode?: 'cors' | 'navigate' | 'no-cors' | 'same-origin';

  /**
   * 一个字符串，表credentials示请求是否遵循重定向，在遇到重定向时导致错误，或者返回重定向（不透明的方式）。设置请求的重定向。
   */
  redirect?: 'error' | 'follow' | 'manual';

  /**
   * ReferrerPolicy
   * 一个用于设置请求的referrerPolicy的推荐人策略。
   * 取值: "" | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url"
   */
  referrerPolicy?:
    | ''
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url';

  /**
   * 一个字符串，用于设置请求的方法。
   */
  method?: RequestMethod;

  headers?: HeadersInit;
}


const gloRequestConfigs = {
};

function core(url: string, reqConfigs: FetchConfigs): Promise<any> {
  console.log('reqConfigs::', reqConfigs);

  if (type.is(url, 'string')) {
    console.log('url::', url);
  }

  return new Promise(async (success, faild) => {
    const response = await fetch(url, reqConfigs);
  });
};


export default core;
