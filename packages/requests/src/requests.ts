import { mergeHeaders, requestCore } from './core';
import ty, { isString } from '@trz/type';
import Uri from '@trz/uri';
import util from '@trz/util';
import { RequestsConstructor, RequestConfigsInterface, SearchParamsInterface } from '..';


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

    descriptor.value = function(url: string, opts?: any): typeof fnOriginCaller {
      if (ty.isString('opts')) {
        opts = { [propertyName.toLowerCase() === 'get' ? 'searchParams' : 'raw']: opts };
      }

      const headers: Headers = mergeHeaders(properties?.headers ?? {}, opts.headers);

      return fnOriginCaller.call(this, url, {
        ...properties,
        ...opts,
        headers,
        method: propertyName.toUpperCase(),
      });
    };
  };

  class Requests {
    [ k: string ]: any;

    constructor(cfgs: RequestConfigsInterface | string = {}) {
      let basicConfigs: RequestConfigsInterface = <RequestConfigsInterface>cfgs;

      if (ty.is(cfgs, 'string')) {
        const { origin: host, pathname } = new Uri(<string>cfgs);
        basicConfigs = { host, pathname };
      }

      const { timeout, host, pathname, withUserAuth, retry, retryDelay, headers } = basicConfigs;

      defineProperty(this, 'headers', headers);

      if (ty.isNumber(+(<number | string>timeout)) && +(<number | string>timeout) >= 0) {
        defineProperty(this, 'timeout', +(<number | string>timeout));
      }

      if (ty.is(host, 'string') && host) {
        defineProperty(this, 'host', (new Uri(host)).host);
      }

      if (ty.is(pathname, 'string') && pathname) {
        defineProperty(this, 'pathname', pathname);
      }

      if (ty.isBoolean(withUserAuth)) {
        defineProperty(this, 'withUserAuth', withUserAuth);
      }

      if (ty.isNumber(timeout) || (ty.isString(timeout) && +(<string>timeout) == timeout)) {
        defineProperty(this, 'timeout', +(<string | number>timeout));
      }

      if (ty.isNumber(retryDelay) || (ty.isString(retryDelay) && +(<string>retryDelay) == retryDelay)) {
        defineProperty(this, 'retryDelay', +(<string | number>retryDelay));
      }

      if (ty.isNumber(retry) || (ty.isString(retry) && parseInt(<string>retry) > 0 )) {
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
      throw new Error('nothing to do');
    }

    @RequestMethodAgent
    options(url: string, opts?: any) {
      throw new Error('nothing to do');
    }

    @RequestMethodAgent
    connect(url: string, opts?: any) {
      throw new Error('nothing to do');
    }
  }

  return new Requests(instanceConfigs);
};


ReqConstructor.getRequestId = (tpl = DEFAULT_REQUEST_ID_TEMPLATE): string => {
  return util.guid(tpl);
};

export { ReqConstructor as Requests };

export default new ReqConstructor();
