
// export type RequestCredentials = "include" | "omit" | "same-origin";



type WithUserAuthType = boolean | RequestParams | RequestPayload | HttpRequestConfigs;

export type RequestMethod = 'GET' | 'DELETE' | 'POST' | 'PUT' | 'UPDATE' | 'OPTIONS' | 'HEAD';

export type RequestBasicUrl = string;

export type RequestParams = { [k: string]: any };

export type RequestPayload = { [k: string]: any } | string | number;

export type FetchConfigs = RequestInit;

export type Arguments = [pathname: string, withUserAuth?: boolean | HttpRequestConfigs | RequestPayload, payload?: RequestPayload];

export declare function setConfigs(globalConfigs: HttpRequestConfigs): HttpRequestConfigs;

export interface HttpRequestConfigs extends FetchConfigs {
  // 公用主机前缀
  host?: string;
  // 业务请求地址
  pathname?: string | unknown;
  // 请求头
  headers?: HeadersInit;
  // 设置是否需要携带Cookies
  withUserAuth?: boolean;

  credentials?: RequestCredentials;

  params?: RequestParams | string;

  payload?: RequestPayload;

  responseHandler?: (responseBody: any) => Promise<any>;


  [k: string]: any;
}

export type setConfigsFunction<T = HttpRequestConfigs | string> = (arg: T) => T;

// export type RequestMethodDispatcher<P = RequestBasicUrl, C = TWithUserAuthType, T = RequestParams | RequestPayload> = (P, C, T) => Promise<any>;
export interface HttpRequestInterface extends HttpRequestConfigs {
  setConfigs: setConfigsFunction;

  GET(pathname: RequestBasicUrl, withUserAuth: boolean | HttpRequestConfigs, paramse: RequestParams): Promise<any>;
  GET(pathname: RequestBasicUrl, params: RequestParams | HttpRequestConfigs): Promise<any>;

  POST(pathname: RequestBasicUrl, withUserAuth: boolean | HttpRequestConfigs, paramse: RequestPayload): Promise<any>;
  POST(pathname: RequestBasicUrl, params: RequestPayload | HttpRequestConfigs): Promise<any>;
}


declare const HttpRequest: {
  prototype: HttpRequestInterface;
  setConfigs: setConfigsFunction;
  new(configs: HttpRequestConfigs): HttpRequestInterface;
};

export default HttpRequest;
