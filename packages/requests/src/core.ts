/** --- */
import util, { guid, ty } from '@trz/util';
import Uri, { SearchParams } from '@trz/uri';
import Serialize from '@trz/serialize';


type HeaderType = string[][] | Record<string, string>;

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

type RequestCoreType = Promise<Record<string, any> | string>;

interface RequestCoreInterface {
  (P: RequestOptionInterface): RequestCoreType;
}

export type RequestsError = {
  code: number;
  message: string;
};
/* ------------------------------------------------------------------------------------------------------------------ */

// 默认请求超时时间
export const DEFAULT_TIMEOUT = 30;
// 重试延迟时长默认值，单位：毫秒
export const DEFAULT_RETRY_DELAY = 1000;
export const ERR_REQUSST_TIMEOUT = 100504;


enum RequestErrorMessage {
  'ERR_REQUSST_TIMEOUT' = '超时了'
}

enum RequestErrorCode {
  'ERR_REQUEST_TIMEOUT',
  'ERR_MISSING_PAGE'
}


class RequestError extends Error {
  static ERR_REQUSST_TIMEOUT = '100504';

  code: number | string = 10000;

  message = '';

  get name() {
    return 'RequestError';
  }

  constructor(stateCode: number | string) {
    super(RequestErrorMessage[stateCode] ?? '未知类型错误');
    this.message = RequestErrorMessage[stateCode] ?? '未知类型错误';
    this.code = stateCode || 0;
  }
}


export const mergeHeaders: (...args: HeaderType[]) => HeaderType = (...args: HeaderType[]): HeaderType => {
  // const singularKey = [ 'x-request-id', 'authorization' ];
  // const headers = new Headers();

  const headers: string[][] = [];

  // for (const header of args) {
  //   if (util.type.isArray(header)) {
  //     headers = { ...headers, ...(Object.fromEntries(header as any)) };
  //   }
  //   else {
  //     headers = { ...headers, ...header };
  //   }
  // }

  return Object.fromEntries(headers);
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

const getCredentials = ( opts: RequestOptionInterface): RequestCredentials => {
  return ((
    ([ 'omit', 'include' ][+(opts.withUserAuth as boolean)]) as RequestCredentials)
      || (opts.withUserAuth as RequestCredentials)) ?? 'same-origin';
};

const getHeaders = (opts: RequestOptionInterface): HeaderType => {
  return mergeHeaders({
    'Accept': 'application/json,text/*;q=0.99,*/*;q=0.8',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json;charset=utf-8',
    'X-Request-ID': `-${'*'.repeat(4)}`.repeat(4).slice(1),
    'X-Request-Client': 'TrzRequests/0.1.0',
  }, (opts?.headers ?? {}));
};

const getRequestUrl = (opts: RequestOptionInterface): string => {
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

  const url = new Uri(getRequestHost(opts), opts.url);


  url.setSearch(getUrlSearchParams(opts?.searchParams));

  return url.toString();
};

export const requestCore: RequestCoreInterface = (requestOptions: RequestOptionInterface):RequestCoreType => {
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
  reqOpts.cache = reqOpts.cache ?? 'no-cache';
  reqOpts.credentials = getCredentials(reqOpts);
  reqOpts.headers = getHeaders(reqOpts);

  const reqTimeout: () => Promise<unknown> = (): Promise<unknown> => {
    const timeout = (requestOptions?.timeout ?? DEFAULT_TIMEOUT) * 1000;

    return (new Promise((resolve, reject) => {
      if (timeout < 0) return;

      // console.debug('>> 当前超时：%dms (默认超时：%dms)', timeout, DEFAULT_TIMEOUT * 1000);
      reqTimeoutId = setTimeout(() => {
        abortController.abort();
        reject(new RequestError(RequestError.ERR_REQUSST_TIMEOUT));
      }, timeout);
    }));
  };


  const reqFetch: () => Promise<any> = (): Promise<any> => {
    const { body = null, cache, credentials, headers, method } = reqOpts;

    const requestInfo = new Request(getRequestUrl(reqOpts), {
      body: null,
      cache,
      credentials,
      headers,
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
          return Promise.reject(response);
        }

        console.log(response);
        return response;
      })
    );
  };

  return Promise.race([ reqTimeout(), reqFetch() ]).then((response: Response): Promise<string | Record<string, any>> => {
    // console.log('%cresponse:::', 'color: #00f;', response);
    const responseHeaders: string[] = (response.headers.get('content-type') || '').split('; ');
    console.log('%cresponse:::', 'color: #00f;', responseHeaders);

    if (responseHeaders.some((predicate: string): boolean => predicate.includes('json'))) {
      return response.json().catch((e): any=> response.text());
    }

    return response.text();
  }).catch((e: any) => {
    console.dir(e);
    return Promise.reject({});
  });
};

export default requestCore;
