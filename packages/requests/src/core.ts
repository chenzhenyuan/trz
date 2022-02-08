

/** --- */
import util, { guid, ty } from '@trz/util';
import Uri, { SearchParams } from '@trz/uri';
import Serialize from '@trz/serialize';
import RequestError, { ERR_REQUSST_TIMEOUT } from './RequestsError';


type HeaderType = Record<string, any> | any[][] | HeadersInit;

interface RequestOptionInterface extends Omit<RequestInit, 'host' | 'url' | 'timeout' | 'signal' | 'body' | 'headers'> {
  host?: string;
  url: string;
  timeout?: number;
  withUserAuth?: boolean | RequestCredentials,
  abortController?: AbortController,
  searchParams?: Record<string, unknown> | URLSearchParams | SearchParams | string;
  headers: HeaderType;
  body?: Record<string, unknown> | URLSearchParams | string | FormData |  Blob | BufferSource | null;
}

// type RequestCoreType = Promise<string | Record<string, any>>;

interface RequestCoreInterface {
  (P: RequestOptionInterface): Promise<string | Record<string, any>>;
}

export type RequestsError = {
  code: number;
  message: string;
};
/* ------------------------------------------------------------------------------------------------------------------ */

/**
 * @description   -
 * @param         {HeaderType} header1
 * @param         {HeaderType} header2
 * @param         {HeaderType} ...
 * @return        {Record<string, string>}
 */
export const mergeHeaders = (...argumentList: HeaderType[]):  Record<string, string> => {
  // const singularKey = [ 'x-request-id', 'authorization' ];
  const headers: HeaderType = {};

  argumentList.forEach((headerCfg: HeaderType) => {
    if (headerCfg instanceof Headers || util.type.isArray(headerCfg)) {
      headerCfg = Object.fromEntries(headerCfg as any);
    }

    Object.keys(headerCfg).forEach((headerKey) => {
      const headerValue = (
        util.type.isArray(headerCfg[headerKey])
          ? headerCfg[headerKey].join(',')
          : headerCfg[headerKey]
      );

      if (!headers.hasOwnProperty(headerKey)) {
        headers[headerKey] = headerValue;
        return;
      }

      if ((new RegExp(`${headerValue}(;|,)?`, 'img')).test(headers[headerKey]) === false) {
        headers[headerKey] = [ headerValue, headers[headerKey] ].join(',');
      }
    });
  });

  console.log('** mergeHeaders:::', headers);
  return headers;
};

// 默认请求超时时间
export const DEFAULT_TIMEOUT = 30;
// 重试延迟时长默认值，单位：毫秒
export const DEFAULT_RETRY_DELAY = 1000;


const basic = {
  'Accept': 'text/*;q=0.99,*/*;q=0.8',
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json;charset=utf8',
  // 'x-request-id': `-${'*'.repeat(4)}`.repeat(4).slice(1),
  'x-request-client': 'TrzRequests/0.1.0',
};


const getRequestHost = (opts: RequestOptionInterface): string => {
  const requestHost = opts.host ?? '';

  if (requestHost === '') {
    return requestHost;
  }

  return ( (requestHost).slice(-1) === '/' ? requestHost : `${requestHost}/`);
};


const getRequestBody = (options: any) => {
  const { body = null, method = 'GET' } = options;
  if ([ 'GET', 'HEAD' ].includes(options.method?.toUpperCase())) return null;

  if (util.type.is(body, 'string') || body instanceof FormData || body instanceof Blob || body instanceof ArrayBuffer) {
    return body;
  }

  return JSON.stringify(body);
};

/**
 * @description   从配置中提取Cookie认证携带方式
 * @param         {RequestOptionInterface} opts
 * @return        {RequestCredentials}
 */
const getCredentials = ( opts: RequestOptionInterface): RequestCredentials => {
  return (
    (([ 'omit', 'include' ][+(opts.withUserAuth as boolean)]) as RequestCredentials)
      || (opts.withUserAuth as RequestCredentials)
  ) ?? 'same-origin';
};


/**
 * @description   从配置中提取请求的地址
 * @param         {RequestOptionInterface} opts
 * @return        {string}
 */
const getRequestUrl = (opts: RequestOptionInterface): string => {
  const url = new Uri(getRequestHost(opts), opts.url);
  const getUrlSearchParams = (searchParams?: string | Serialize | URLSearchParams | Record<any, unknown>): Record<any, unknown> => {
    searchParams = searchParams ?? {};
    if (searchParams instanceof Serialize || searchParams instanceof URLSearchParams) {
      return Object.fromEntries(searchParams.entries());
    }
    if (util.type.is(searchParams, 'object')){
      return <Record<any, unknown>>searchParams;
    }
    return {};
  };

  url.setSearch(getUrlSearchParams(opts?.searchParams));
  return url.toString();
};

/**
 * @description   核心函数
 * @param         {RequestOptionInterface} requestOptions
 * @return        {Promise<string | Record<string, any>>}
 */
export const requestCore: RequestCoreInterface = (requestOptions: RequestOptionInterface): Promise<string | Record<string, any>> => {
  const reqOpts = { ...requestOptions };

  let reqTimeoutId: number | NodeJS.Timeout;

  const abortController =  (
    requestOptions.abortController instanceof AbortController
      ? requestOptions.abortController
      : new AbortController()
  );

  /* 处理请求的超时时间，将传入的秒转换为毫秒，不传时，则使用默认值 */


  const mode: RequestMode = 'cors';
  const redirect: RequestRedirect = 'follow';
  const referrer = '';
  const referrerPolicy: ReferrerPolicy = 'no-referrer';


  reqOpts.method = (reqOpts.method ?? 'GET').toUpperCase();
  reqOpts.body = getRequestBody(reqOpts);
  reqOpts.credentials = getCredentials(reqOpts);

  const reqTimeout: () => Promise<unknown> = (): Promise<unknown> => {
    const timeout = (requestOptions?.timeout ?? DEFAULT_TIMEOUT) * 1000;

    return (new Promise((resolve, reject) => {
      if (timeout < 0) return;

      // console.debug('>> 当前超时：%dms (默认超时：%dms)', timeout, DEFAULT_TIMEOUT * 1000);
      reqTimeoutId = setTimeout(() => {
        abortController.abort();
        reject(new RequestError(ERR_REQUSST_TIMEOUT));
      }, timeout);
    }));
  };

  const reqFetch: () => Promise<any> = (): Promise<any> => {
    const { body = null, cache, credentials, method } = reqOpts;

    const requestInfo: Request = new Request(getRequestUrl(reqOpts), {
      body: null,
      cache: reqOpts.cache ?? 'no-cache',
      credentials,
      headers: mergeHeaders(basic, reqOpts.headers ?? {}),
      /* integrity, */
      method,
      mode,
      redirect,
      referrer,
      referrerPolicy,
      signal: abortController.signal,
      keepalive: false,
    });

    console.log('>> %cRequestInfo:::', 'color: #00a700', requestInfo);
    return (
      fetch(requestInfo).finally((): void => {
        reqTimeoutId && clearTimeout(<number>reqTimeoutId);
      }).then((response: Response): Promise<Response> | Response => {

        if (response.status >= 400) {
          const err = new RequestError('ERR_NET');
          err.response = response;
          return Promise.reject(err);
        }

        return response;
      })
    );
  };

  return Promise.race([ reqTimeout(), reqFetch() ]).then((response: Response): Promise<string | Record<string, any>> => {
    // console.log('%cresponse:::', 'color: #00f;', response);
    const responseHeaders: string[] = (response.headers.get('content-type') || '').split('; ');

    if (responseHeaders.some((predicate: string): boolean => predicate.includes('json'))) {
      return response.json().catch(() => response.text());
    }

    return response.text();
  }).catch((err: any) => {
    console.log('>>>', typeof err, err);
    return Promise.reject(err);
  });
};

/* 主功能函数导出为默认导出 */
export default requestCore;
