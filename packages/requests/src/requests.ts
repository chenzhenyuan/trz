import { mergeHeaders, requestCore } from './core';
import type from '@trz/type';
import Uri, { Serialize } from '@trz/uri';
import util from '@trz/util/src';
import { RequestsConstructor, RequestConfigsInterface } from '../index.d';


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

    descriptor.value = function(url: string, data?: any, opts?: Record<string, any>): typeof fnOriginCaller {
      const method = propertyName.toUpperCase();
      const uri = new Uri(url as string);

      url = uri.origin + uri.pathname;
      opts = { ...(opts || {}) };

      if (method === 'GET' && type.is(data, 'string')) {
        new Serialize(data);
      }

      console.log(uri.searchParams);


      data = { ...(new Uri(url).searchParams), ...data };
      opts = { ...opts, [propertyName.toLowerCase() === 'get' ? 'searchParams' : 'body']: data };

      const headers: Headers = mergeHeaders(properties?.headers ?? {}, opts?.headers);
      const options = { url, ...properties, ...opts, headers, method };
      console.log('options::', options);
      return fnOriginCaller.call(this, url, options);
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
