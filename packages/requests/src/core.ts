/** --- */
import util, { guid, ty } from '@trz/util';
import Uri from '@trz/uri';

interface RequestOptionInterface extends RequestInit {
  url: string;
  host?: string;
  timeout?: number;
  pathname?: string;
  withUserAuth?: boolean | RequestCredentials,
}
interface RequestCoreInterface {
  (P: RequestOptionInterface): PromiseLike<any>;
}


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


const ERR_REQUSST_TIMEOUT = 100504;
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


// 默认请求超时时间
export const DEFAULT_TIMEOUT = 30;
// --------------------------------------------------------------------------------------------------------------------
export const requestCore: RequestCoreInterface = (requestOptions: RequestOptionInterface) => {
  let reqTimeoutId: number | NodeJS.Timeout;

  const abortController = new AbortController();
  const { signal } = abortController;


  const { host, pathname: prefix, url, method, withUserAuth } = requestOptions || {};

  /* 处理请求的超时时间，将传入的秒转换为毫秒，为 0 或不传时，则使用默认值 */
  const timeout = (requestOptions?.timeout || DEFAULT_TIMEOUT) * 1000;

  const domain = (new Uri(host)).origin;
  const uri = new Uri(requestOptions.url);
  const pathname = util.pathname.resolve(window.location.pathname, util.pathname.join(prefix ?? '', uri.pathname));

  const headers: Headers = mergeHeaders(gloHeaders, (requestOptions?.headers ?? {}));
  const cache: RequestCache = requestOptions.cache ?? 'no-cache';
  const credentials: RequestCredentials  = (<RequestCredentials>([ 'omit', 'include' ][+(withUserAuth as boolean)]) || (withUserAuth as RequestCredentials)) ?? 'same-origin';
  const mode: RequestMode = 'cors';
  const redirect: RequestRedirect = 'follow';
  const referrer = '';
  const referrerPolicy: ReferrerPolicy = 'no-referrer';

  const reqTimeout = () => {
    return (
      new Promise((resolve, reject) => {
        reqTimeoutId = setTimeout(() => {
          abortController.abort();
          reject(new RequestError(ERR_REQUSST_TIMEOUT, 'The request timeout.'));
        }, timeout);
      })
    );
  };

  const reqFetch = (): Promise<any> => {
    const $url = domain + pathname + uri.searchParams.stringify();

    console.log($url);

    if (headers.has('x-request-id')) {
      headers.set('x-request-id', util.guid(headers.get('x-request-id') ?? void(0)));
    }

    const $reqInit = new Request($url, {
      // body,
      cache, credentials, headers,
      // integrity,
      keepalive: false,
      method,
      mode, redirect, referrer, referrerPolicy, signal,
    });


    // console.debug('%c[请求开始]', 'color: #0000ff', $reqInit);
    return fetch($reqInit).then((response) => (response.status >= 400 ? Promise.reject(response) : response));
  };

  return (
    Promise.race([ reqTimeout(), reqFetch() ]).finally(() => {
      clearTimeout(<number>reqTimeoutId);
      // console.debug('%c[请求结束]', 'color: #559955', headers.get('x-request-id'));
    })
  );
};

export default requestCore;
