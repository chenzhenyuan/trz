/**
 * @description   A library for network request.
 * @author        <Jayne@ChenZhenyuan.com>
 * @latest        2021/09/05 17:40
 */


import 'whatwg-fetch';
import { is } from '@trz/type';
import { FetchConfigs, HttpRequestConfigs, HttpRequestInterface, RequestMethod, RequestParams, RequestPayload, Arguments } from './propTypes';


const globalConfigs: HttpRequestConfigs = {
  withUserAuth: false,
  // credentials: "omit",
  headers: {
    "content-type": "application/json; charset=utf-8",
    "x-requested-with": "HttpRequest/0.1.0",
  },
};


const isHost = (h: string): boolean => {
  return /^(https?\:)?(\/\/[^\.]+(\.[^\.\/]+)+)/.test(h);
};

const getRealType = (o: unknown): string => {
  return Object.prototype.toString.call(o).toLowerCase().slice(8, -1);
};

const argvNormalize = (pathname: string, withUserAuth?: any, payload?: RequestPayload): HttpRequestConfigs => {
  if (typeof withUserAuth === 'boolean') {
    return { withUserAuth, pathname, payload, };
  }
  else if (getRealType(payload) === 'object') {
    return { pathname, payload, ...withUserAuth };
  }
  return { pathname, payload: withUserAuth };
};

// export const paramsParse = (paramsString) => { };

export const paramsStringify = (paramsObj = {}, prefix = '?', symbol = '&'): string => {
  const params = Object.keys(paramsObj).map(
    (kn) => (typeof paramsObj[ kn ] !== 'undefined') && `${kn}=${paramsObj[ kn ]}`
  );

  return params.length ? [ prefix ].concat(params).join(symbol || '&') : '';
};

const _fomtRequestUrl = (host: string, pathname: string, search = '') => {
  const isFullUrl = isHost(pathname);
  const reqUrl = isFullUrl ? pathname : `${host.replace(/(\/+)$/g, '')}${`///${pathname}`.replace(/^\/{3,}/g, '/')}`;
  const reqSearch: string = search && ((search && `${search}`.slice(0, 1) === '?') ? search : `?${search}`);

  return `${reqUrl}${reqSearch}`;
};


export class HttpRequest {
  static setConfigs(requestConfigs: HttpRequestConfigs): HttpRequestConfigs {
    Object.keys(requestConfigs).forEach((Ky) => {
      globalConfigs[ Ky ] = requestConfigs[ Ky ];
    });

    return { ...globalConfigs };
  }

  readonly responseHandler: any;
  readonly hostPrefix: string = '';
  readonly withUserAuth: boolean | unknown = globalConfigs.withUserAuth;
  readonly headers: { [ k: string ]: any; } = { ...globalConfigs.headers };
  readonly credentials: "include" | "omit" | "same-origin" = 'omit';

  latest: Response;

  #originalConfigs = {};

  constructor(requestConfigs?: string | HttpRequestConfigs) {
    const basicCfgs: HttpRequestConfigs = (
      typeof requestConfigs === 'string'
        ? { host: requestConfigs }
        : { ...requestConfigs }
    );

    this.#originalConfigs = { ...basicCfgs };

    this.hostPrefix = basicCfgs.host || globalConfigs.host || '';

    if (typeof basicCfgs.withUserAuth === 'boolean') {
      this.withUserAuth = basicCfgs.withUserAuth;
    }

    if (basicCfgs.headers) {
      this.headers = { ...globalConfigs.headers, ...basicCfgs.headers };
    }

    if (typeof basicCfgs.responseHandler == 'function') {
      this.responseHandler = basicCfgs.responseHandler;
    }
  }

  request(method: RequestMethod, requestConfigs: HttpRequestConfigs): Promise<any> {
    const {
      pathname,
      headers = {},
      params,
      payload,
      cache = 'default',
      credentials,
      mode = 'cors',

      /* 暂时不支持这两个选项 */
      // signal,
      // keepalive = false,
    } = requestConfigs || {};

    const reqCfgs: FetchConfigs = {
      method,
      mode,
      credentials,
      cache,
      referrer: 'no-referrer',
      referrerPolicy: 'no-referrer',
    };

    if (!credentials || !this.credentials || globalConfigs.credentials) {
      const { withUserAuth } = { ...globalConfigs, withUserAuth: this.withUserAuth, ...requestConfigs };

      reqCfgs.credentials = (
        withUserAuth === true
          ? 'include'
          : 'omit'
      );
    }

    if (payload !== undefined) {
      reqCfgs.body = typeof payload === 'string' ? payload : JSON.stringify(payload);
    }

    if (headers || this.headers || globalConfigs.headers) {
      const headersCfg = { ...globalConfigs.headers, ...this.headers, ...headers };
      const reqHeaders = new Headers();

      Object.keys(headersCfg).forEach((key) => {
        reqHeaders.append(key, headersCfg[ key ]);
      });

      reqCfgs.headers = reqHeaders;
    }

    return (
      fetch(_fomtRequestUrl(this.hostPrefix, pathname, paramsStringify(params)), reqCfgs).then((response: Response) => {
        const { headers } = response;
        const [ contentType ] = `${headers.get('content-type') || ''}`.split(/;\s?/);

        this.latest = response;

        return (
          contentType.indexOf('json') > -1
            ? response.json()
            : response.text()
        );
      }).then(this.responseHandler)
    );
  }

  GET(pathname: string, withUserAuth?: RequestParams | boolean | HttpRequestConfigs, params?: RequestParams): Promise<any> {
    const reqConfigs = (
      typeof withUserAuth === 'boolean'
        ? { withUserAuth, pathname, params, }
        : { ...withUserAuth, pathname, params }
    );
    return this.request('GET', reqConfigs);
  }

  POST(...args: Arguments): Promise<any> {
    return this.request('POST', argvNormalize(...args));
  }

  PUT(...args: Arguments): Promise<any> {
    return this.request('PUT', argvNormalize(...args));
  }

  UPDATE(...args: Arguments): Promise<any> {
    return this.request('UPDATE', argvNormalize(...args));
  }

  DELETE(...args: Arguments): Promise<any> {
    return this.request('DELETE', argvNormalize(...args));
  }

  setConfigs(requestConfigs: HttpRequestConfigs | string): HttpRequest {
    const basicCfgs: HttpRequestConfigs = (typeof requestConfigs === 'string' ? { host: requestConfigs } : { ...requestConfigs });

    return new HttpRequest({ ...this.#originalConfigs, ...basicCfgs });
  }

  auth(): never {
    throw new Error('The function of unrealized. Please wait in patient. 😊');
  }
}

export default new HttpRequest();
