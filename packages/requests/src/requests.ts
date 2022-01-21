import { mergeHeaders, requestCore } from './core';
// import T from '@trz/type';
import Uri  from '@trz/uri/src/uri';
import Serialize from '@trz/serialize';
import util from '@trz/util';
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
      console.debug('** method:::', method);

      // const uri = new Uri(<string>url);
      // console.log('**    uri:::', url, uri);
      // url = uri.origin + uri.pathname;

      opts = { ...(opts || {}) };

      console.debug('**   opts:::', opts);
      if (method === 'GET' && util.type.is(data, 'string')) {
        //  new Serialize(data)
      }

      data = { ...(new Uri(url).searchParams), ...data };

      const headers: Headers = mergeHeaders(properties?.headers ?? {}, opts?.headers);
      const options = { url, ...properties, ...opts, headers, method };

      console.debug('** %coptions::: url: %s, data: %o, options: %o', 'color: #8177e1', url, data, options);
      return fnOriginCaller.call(this, url, data, options);
    };
  };

  class Requests {
    [ k: string ]: any;

    constructor(cfgs: RequestConfigsInterface | string = {}) {
      let basicConfigs: RequestConfigsInterface = <RequestConfigsInterface>cfgs;

      if (util.type.is(cfgs, 'string')) {
        const { origin: host, pathname } = new Uri(<string>cfgs);
        basicConfigs = { host, pathname };
      }

      const { timeout, host, pathname, withUserAuth, retry, retryDelay, headers } = basicConfigs;

      defineProperty(this, 'headers', headers);

      if (util.type.isNumber(+(<number | string>timeout)) && +(<number | string>timeout) >= 0) {
        defineProperty(this, 'timeout', +(<number | string>timeout));
      }

      if (util.type.is(host, 'string') && host) {
        defineProperty(this, 'host', (new Uri(host)).toString());
      }

      if (util.type.is(pathname, 'string') && pathname) {
        defineProperty(this, 'pathname', pathname);
      }

      if (util.type.isBoolean(withUserAuth)) {
        defineProperty(this, 'withUserAuth', withUserAuth);
      }

      if (util.type.isNumber(timeout) || (util.type.isString(timeout) && +(<string>timeout) == timeout)) {
        defineProperty(this, 'timeout', +(<string | number>timeout));
      }

      if (util.type.isNumber(retryDelay) || (util.type.isString(retryDelay) && +(<string>retryDelay) == retryDelay)) {
        defineProperty(this, 'retryDelay', +(<string | number>retryDelay));
      }

      if (util.type.isNumber(retry) || (util.type.isString(retry) && parseInt(<string>retry) > 0 )) {
        defineProperty(this, 'retry', parseInt(<string>retry));
      }
    }

    @RequestMethodAgent
    get(url: string, data?: any, opts?: any): PromiseLike<any> {
      return requestCore({...opts, data, url});
    }

    @RequestMethodAgent
    post(url: string, data?:any, opts?: any) {
      return requestCore({...opts, data, url});
    }

    @RequestMethodAgent
    put(url: string, data?:any, opts?: any) {
      return requestCore({...opts, data, url});
    }

    @RequestMethodAgent
    patch(url: string, data?:any, opts?: any) {
      return requestCore({...opts, data, url});
    }

    @RequestMethodAgent
    delete(url: string, data?:any, opts?: any) {
      return requestCore({...opts, data, url});
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

  // Requests.prototype

  return new Requests(instanceConfigs);
};


ReqConstructor.getRequestId = (tpl = DEFAULT_REQUEST_ID_TEMPLATE): string => {
  return util.guid(tpl);
};

export { ReqConstructor as Requests };

export default new ReqConstructor();
