import { mergeHeaders, requestCore } from './core';
import type from '@trz/type';
import Uri, { isUri, isSearchParams, } from '@trz/uri';
import util from '@trz/util';
import { RequestsConstructor, RequestConfigsInterface, SearchParamsInterface } from '..';
import { Serialize } from '@trz/uri/lib/core';


const DEFAULT_REQUEST_ID_TEMPLATE = '****-*****-*****-****';

class TypeError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'TypeError';

    const stack = this.stack?.split('\n');
    stack?.splice(1, 1);

    this.stack = stack?.join('\n');
  }
}

// @ts-ignores
const ReqConstructor: RequestsConstructor = function(this: any, instanceConfigs?: RequestConfigsInterface | string) {

  if (!(this instanceof ReqConstructor)) {
    throw new TypeError('Cannot call a class as a function.');
  }

  const properties: RequestConfigsInterface & { [ p: string ]: any; } = {};

  // util
  function defineProperty(o: any, propertyKey: string, attributes: any): void {

    if (attributes === undefined) return;

    properties[propertyKey] = attributes;

    Object.defineProperty(o, propertyKey, {
      value: attributes, writable: false, enumerable: true, configurable: false
    });
  }

  /** 修饰器 */
  const RequestMethodAgent = (o: unknown, propertyName: string, descriptor: any) => {
    const fnOriginCaller = descriptor.value;

    descriptor.value = function(url: string, ...args: any[]): typeof fnOriginCaller {
      let data, opts;

      if (args.length === 2) {
        [ data, opts ] = args;
      }

      const { searchParams } = new Uri(url);

      if (type.isString(opts)) {
        opts = { [propertyName.toLowerCase() === 'get' ? 'searchParams' : 'raw']: opts };
      }

      const headers: Headers = mergeHeaders(properties?.headers ?? {}, opts.headers);
      const method = propertyName.toUpperCase();

      if (type.isString(data)) {
        data = new Serialize(<string>data).toString();

        if (method === 'GET') {
          opts.searchParams = data;
        }
        else {
          opts.body = data;
        }
      }

      return fnOriginCaller.call(this, url, {
        ...properties,
        ...opts,
        headers,
        method,
      });
    };
  };

  class Requests {
    [ k: string ]: any;

    constructor(cfgs: RequestConfigsInterface | string = {}) {
      let basicConfigs: RequestConfigsInterface = <RequestConfigsInterface>cfgs;

      if (type.is(cfgs, 'string')) {
        const { origin: host, pathname } = new Uri(<string>cfgs);
        basicConfigs = { host, pathname };
      }

      const { timeout, host, pathname, withUserAuth, retry, retryDelay, headers } = basicConfigs;

      defineProperty(this, 'headers', headers);

      if (type.isNumber(+(<number | string>timeout)) && +(<number | string>timeout) >= 0) {
        defineProperty(this, 'timeout', +(<number | string>timeout));
      }

      if (type.is(host, 'string') && host) {
        defineProperty(this, 'host', (new Uri(host)).host);
      }

      if (type.is(pathname, 'string') && pathname) {
        defineProperty(this, 'pathname', pathname);
      }

      if (type.isBoolean(withUserAuth)) {
        defineProperty(this, 'withUserAuth', withUserAuth);
      }

      if (type.isNumber(timeout) || (type.isString(timeout) && +(<string>timeout) == timeout)) {
        defineProperty(this, 'timeout', +(<string | number>timeout));
      }

      if (type.isNumber(retryDelay) || (type.isString(retryDelay) && +(<string>retryDelay) == retryDelay)) {
        defineProperty(this, 'retryDelay', +(<string | number>retryDelay));
      }

      if (type.isNumber(retry) || (type.isString(retry) && parseInt(<string>retry) > 0 )) {
        defineProperty(this, 'retry', parseInt(<string>retry));
      }
    }

    @RequestMethodAgent
    get(url: string, opts?: any): PromiseLike<any> {
      return requestCore({...opts, url});
    }

    @RequestMethodAgent
    post(url: string, opts?: any) {
      return requestCore({...opts, url});
    }

    @RequestMethodAgent
    put(url: string, opts?: any) {
      return requestCore({...opts, url});
    }

    @RequestMethodAgent
    patch(url: string, opts?: any) {
      return requestCore({...opts, url});
    }

    @RequestMethodAgent
    delete(url: string, opts?: any) {
      return requestCore({...opts, url});
    }

    @RequestMethodAgent
    head(url: string, opts?: any) {
      throw new Error('Nothing todo');
    }

    @RequestMethodAgent
    options(url: string, opts?: any) {
      throw new Error('Nothing todo');
    }

    @RequestMethodAgent
    connect(url: string, opts?: any) {
      throw new Error('Nothing todo');
    }
  }

  return new Requests(instanceConfigs);
};


ReqConstructor.getRequestId = (tpl = DEFAULT_REQUEST_ID_TEMPLATE): string => {
  return util.guid(tpl);
};

export { ReqConstructor as Requests };

export default new ReqConstructor();
