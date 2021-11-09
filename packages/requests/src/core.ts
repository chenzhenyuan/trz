

// interface ResponseInterface { }
import path from '@trz/util/lib/pathname';
import Uri from '@trz/uri/src/index';
import { guid } from '@trz/util';

// RequestInit
interface RequestOptionInterface extends RequestInit {
  timeout?: number;
  pathname?: string;
  host?: string;
  url: string;
}
interface RequestCoreInterface {
  (P: RequestOptionInterface): PromiseLike<any>
}


// 默认请求超时时间
export const DEFAULT_VALUE_TIMEOUT = 5;
const ERR_REQUSST_TIMEOUT = 100504;


const $headers = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-Request-Id': '****-6*****-**********',
});

const gloRequest = new Request('./', {
  // body?: BodyInit | null;
  cache: 'default',
  method: 'GET',
  mode: 'cors',
  referrer: '',
  credentials: 'include',
  headers: $headers,
  keepalive: false,
  signal: null,
});

class RequestError extends Error {
  name = 'NetworkError';

  code: number | string = 10000;

  message = '';

  constructor(stateCode: number | string, message?: string) {
    super(message);
    this.code = stateCode;

    this.message = <string>message;
  }
}


const createHeaders = (h: HeadersInit) => {
  console.log(h);
  return new Headers({
    'X-Request-Id': guid('****-6*****-llll')
  });
};


// --------------------------------------------------------------------------------------------------------------------
export const requestCore: RequestCoreInterface = (requestOptions: RequestOptionInterface) => {
  const abortController = new AbortController();
  const { signal } = abortController;

  let timeoutId: number | NodeJS.Timeout;
  const { host, pathname: prefix, url, ...reqOpts } = requestOptions || {};

  console.log('reqOpts::', reqOpts);

  const domain = (new Uri(host)).origin;
  const pathname = path.resolve(window.location.pathname, path.join(prefix ?? '', url));

  const reqTimeout = () => {
    return (
      new Promise((resolve, reject) => {
        timeoutId = setTimeout(() => {
          const err = new NetworkError(ERR_REQUSST_TIMEOUT, 'The request timeout.');
          // console.groupCollapsed('%c[请求超时] %o', 'color:red; background:#faebd7', requestOptions);
          // console.log('%c[超时时间]：%c%fs', 'color: #770077', 'color: #777700', reqOpts.timeout);
          console.groupEnd();
          abortController.abort();
          reject(err);
        }, (reqOpts?.timeout || DEFAULT_VALUE_TIMEOUT) * 1000);
      })
    );
  };

  const reqFetch = (...args: any[]): Promise<any> => {
    // fetch(input: RequestInfo, init?: RequestInit)
    // console.log(`${$GetUid()}${$GetUid()}${$GetUid()}`);

    const targetUrl = domain + pathname;
    const request = new Request(targetUrl, new Request(gloRequest, {
      signal,
      /* "default" | "force-cache" | "no-cache" | "no-store" | "only-if-cached" | "reload" */
      cache: reqOpts.cache ?? 'no-cache',
      method: reqOpts.method,
      headers: createHeaders(<HeadersInit>reqOpts.headers),
    }));

    // console.log(requestOptions);
    console.log('%c[请求开始]', 'color: #0000ff', request);

    return (
      fetch(request).then((response) => {
        if (response.status >= 400) {
          return Promise.reject(response);
        }
      })
    );
  };



  // console.groupCollapsed('RequestOptions ↓', reqOpts);
  // console.log('headers::', $headers, reqOpts.headers);
  // console.log('       url::', url);
  // console.log('    method::', reqOpts.method);
  // console.groupEnd();

  return (
    Promise.race([ reqTimeout(), reqFetch() ]).finally(() => {
      // console.log('%c[请求结束]', 'color: #00ff00');
      clearTimeout(<number>timeoutId);
    })
  );
};
