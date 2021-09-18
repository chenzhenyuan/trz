/**
 * declare function fetch(input: Request | string, init?: HttpRequestConfigs): Promise<Response>;
 */

// type HttpRequestConfigs = RequestInit;
// type HttpResponseBody = Response;

// interface RequestConfigs extends RequestInit { }

export interface RequestCoreInterface {
  (url: string, reqConfigs?: RequestConfigs): Promise<any>;

  (reqConfigs: RequestConfigs): Promise<any>;
}

// /* ----------------------------------------------------------------------------- */

export interface RequestConfigs extends RequestInit {

  domain?: "" | string;

  /**
   * 一个BodyInit对象或null，用于设置请求的主体。
   * 取值类型参考： Blob | BufferSource | FormData | URLSearchParams | string
   */
  body?: BodyInit | null;

  /**
   * 一个字符串，表示该请求将如何与浏览器的缓存互动，以设置请求的缓存。
   */
  cache?: RequestCache;

  /**
   * 一个字符串，表示证书是否总是与请求一起发送，从不发送，或者只在发送到同源URL时发送。设置请求的凭证。
   * 取值:
   *    - "omit"       : 默认值，忽略cookie的发送
   *    - "same-origin": 表示cookie只能同域发送，不能跨域发送
   *    - "include"    : cookie既可以同域发送，也可以跨域发送
   */
  credentials?: "omit" | "same-origin" | "include";

  /**
   * 一个字符串，表示请求是否使用CORS，或限制在同源的URL上。设置请求的模式
   */
  mode?: "cors" | "navigate" | "no-cors" | "same-origin";

  /**
   * 一个字符串，表credentials示请求是否遵循重定向，在遇到重定向时导致错误，或者返回重定向（不透明的方式）。设置请求的重定向。
   */
  redirect?: "error" | "follow" | "manual"

  /**
   * 一个用于设置请求的referrerPolicy的推荐人策略。
   */
  referrerPolicy?: ReferrerPolicy;

  /**
  * 一个字符串，用于设置请求的方法。
  */
  method?: "GET" | "POST" | "PUT" | "UPDATE" | "DELETE" | "HEADER" | "OPTIONS";

  headers?: HeadersInit;
}

export interface FetchInterface extends RequestConfigs{
  GET(): Promise<Response>
}

declare const Fetch: {
  new(configs?: RequestConfigs): FetchInterface;

  prototype: FetchInterface;

  setConfig: (configs: RequestConfigs) => void;
};

