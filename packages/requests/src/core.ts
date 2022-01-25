/** --- */
import util, { guid, ty } from '@trz/util';
import Uri from '@trz/uri';
import Serialize from '@trz/serialize';



export const ERR_REQUSST_TIMEOUT = 100504;
// 默认请求超时时间
export const DEFAULT_TIMEOUT = 30;
// 重试延迟时长默认值，单位：毫秒
export const DEFAULT_RETRY_DELAY = 1000;


const gloHeaders = {
  'accept': '*/*',
  'x-request-id': '-********'.repeat(4).slice(1),
  'x-request-client': 'TrzRequests/0.1.0',
};

export const mergeHeaders = (...args: HeadersInit[]): Headers => {
  const singularKey = [ 'x-request-id', 'authorization' ];
  const headers = new Headers();

  const headerSetter = (v: string, k: string): void => {
    if (singularKey.includes(k.toLowerCase())) {
      headers.set(k, v);
    }
    else {
      headers.append(k, v);
    }
  };

  for (let head of args) {
    if (head instanceof Headers) {
      head.forEach(headerSetter);
      continue;
    }
    else if (ty.isObject(head)) {
      head = Object.entries(head);
    }

    if (ty.isArray(head)) {
      (<string[][]>head).forEach(([ k, v ]) => headerSetter(v, k));
    }
  }

  return headers;
};

class RequestError extends Error {
  code: number | string = 10000;

  message = '';

  get name() {
    return 'RequestError';
  }

  constructor(stateCode: number | string, message?: string) {
    super(message);
    this.code = stateCode;
    this.message = <string>message;
  }
}

// --------------------------------------------------------------------------------------------------------------------
type RequestCoreType = Promise<Record<string, any> | string>;

export type RequestsError = {
  code: number;
  message: string;
};

interface RequestOptionInterface extends Omit<RequestInit, 'host' | 'url' | 'timeout' | 'withUserAuth' |'abortController' | 'body'> {
  host?: string;
  url: string;
  timeout?: number;
  withUserAuth?: boolean | RequestCredentials,
  abortController?: AbortController,
  searchParams?: Record<string, unknown> | URLSearchParams | string;
  body?: Record<string, unknown> | URLSearchParams | string | FormData |  Blob | BufferSource;
}

interface RequestCoreInterface {
  (P: RequestOptionInterface): RequestCoreType;
}

function getRequestHost(requestHost: any): string {
  requestHost = requestHost ?? '.';

  return (
    (requestHost).slice(-1) === '/'
      ? requestHost
      : `${requestHost}/`
  );
}

function getRequestBody(options: any) {
  const { body = null, method = 'GET' } = options;
  if ([ 'GET', 'HEAD' ].includes(options.method?.toUpperCase())) return null;

  if (util.type.is(body, 'string') || body instanceof FormData || body instanceof Blob || body instanceof ArrayBuffer) {
    return body;
  }

  return JSON.stringify(body);
}

function getMethod(method: string): string {
  return method.toUpperCase();
}

function getUrlSearchParams(searchParams?: string | Serialize | URLSearchParams | Record<any, unknown>): Record<any, unknown> {

  searchParams = searchParams ?? {};
  console.log(searchParams.entries());

  console.log('searchParams instanceof URLSearchParams::', searchParams instanceof URLSearchParams);
  if (searchParams instanceof Serialize) {
    return Object.fromEntries(searchParams.entries());
  }
  else if (util.type.is(searchParams, 'string')) {
    return Object.fromEntries(new Serialize(searchParams as string).entries());
  }
  else if (util.type.is(searchParams, 'object')){
    return <Record<any, unknown>>searchParams;
  }

  return {};
}

function getCredentials(withUserAuth?: boolean | RequestCredentials): RequestCredentials {
  return (([ 'omit', 'include' ][+(withUserAuth as boolean)]) as RequestCredentials || (withUserAuth as RequestCredentials)) ?? 'same-origin';
}

export const requestCore: RequestCoreInterface = (requestOptions: RequestOptionInterface):RequestCoreType => {
  let reqTimeoutId: number | NodeJS.Timeout;

  const { withUserAuth = false } = requestOptions || {};

  const abortController =  (
    requestOptions.abortController instanceof AbortController
      ? requestOptions.abortController
      : new AbortController()
  );
  const method: string = (requestOptions.method ?? 'GET').toUpperCase();

  const headers: Headers = mergeHeaders(gloHeaders, (requestOptions?.headers ?? {}));
  // console.debug('>> headers::: %o', headers);

  /* 处理请求的超时时间，将传入的秒转换为毫秒，不传时，则使用默认值 */
  const timeout = (requestOptions?.timeout ?? DEFAULT_TIMEOUT) * 1000;
  const cache: RequestCache = requestOptions.cache ?? 'no-cache';
  const credentials: RequestCredentials  = getCredentials(requestOptions?.withUserAuth);
  const mode: RequestMode = 'cors';
  const redirect: RequestRedirect = 'follow';
  const referrer = '';
  const referrerPolicy: ReferrerPolicy = 'no-referrer';

  const reqTimeout = (): Promise<unknown> => {
    return (new Promise((resolve, reject) => {
      // console.debug('>> 当前超时：%dms (默认超时：%dms)', timeout, DEFAULT_TIMEOUT * 1000);
      if (timeout < 0) return;

      reqTimeoutId = setTimeout(() => {
        abortController.abort();
        reject(new RequestError(ERR_REQUSST_TIMEOUT, 'The request timeout.'));
      }, timeout);
    }));
  };

  const reqFetch = (): Promise<any> => {
    const targetUrl = new Uri(getRequestHost(requestOptions.host), requestOptions.url);
    targetUrl.setSearch(getUrlSearchParams(requestOptions.searchParams));

    if (headers.has('x-request-id')) {
      headers.set('x-request-id', util.guid(headers.get('x-request-id') ?? void(0)));
    }



    const reqInfo = new Request(targetUrl.toString(), {
      body: getRequestBody(requestOptions),
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

    console.log('>> %cReqInfo:::', 'color: #00a700', reqInfo);
    return (
      fetch(reqInfo).finally((): void => {
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
  });
};

export default requestCore;
