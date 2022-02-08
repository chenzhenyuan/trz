import { DEFAULT_RETRY_DELAY, DEFAULT_TIMEOUT, mergeHeaders, requestCore } from './core';
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
  function defineProperty(that: any, propertyKey: string, attributes: any): void {
    if (attributes === undefined) return;

    properties[propertyKey] = attributes;

    Object.defineProperty(that, propertyKey, {
      value: attributes,
      writable: false,
      enumerable: true,
      configurable: false
    });
  }

  /** 修饰器 */
  const RequestMethodAgent = (o: unknown, propertyName: string, descriptor: any) => {
    const fnOriginCaller = descriptor.value;

    descriptor.value = function(url: string, data?: any, opts?: Record<string, any>): typeof fnOriginCaller {
      const method = propertyName.toUpperCase();
      console.debug('** method:::', method);
      opts = { ...(opts || {}) };
      console.debug('**   opts:::', opts);

      if (method !== 'GET') {
        console.log(data);
      }


      data = { ...(new Uri(url).searchParams), ...data };


      const headers = mergeHeaders(properties?.headers ?? {}, opts?.headers);
      const options = { url, ...properties, ...opts, headers, method };

      // console.debug('** RequestMethodAgent::', this);
      return (
        fnOriginCaller.call(this, url, data, options).catch((err: any) => {
          return Promise.reject(err);
        }).catch((err: any) => {
          console.log('******', err);
        })
      );
    };
  };

  class Requests {
    [ k: string ]: any;

    constructor(cfgs: RequestConfigsInterface | string = {}) {
      let basicConfigs: RequestConfigsInterface = <RequestConfigsInterface>cfgs;

      if (util.type.is(cfgs, 'string')) {
        basicConfigs = { host: new Uri(<string>cfgs).toString()};
      }

      const { host, headers, withUserAuth, timeout, retry, retryDelay } = basicConfigs;

      defineProperty(this, 'host', new Uri(util.type.is(host, 'string') ? host : '.').toString());
      defineProperty(this, 'headers', headers);
      defineProperty(this, 'withUserAuth', util.type.isBoolean(withUserAuth) ? withUserAuth : false);
      defineProperty(this, 'timeout', isNaN(+(timeout as Pick<RequestConfigsInterface, 'timeout'>)) ? DEFAULT_TIMEOUT : timeout);
      defineProperty(this, 'body', basicConfigs.body ?? null);

      // defineProperty(this, 'retryDelay', isNaN(+(retryDelay as Pick<RequestConfigsInterface, 'retryDelay'>)) ? DEFAULT_RETRY_DELAY : retryDelay);
      // defineProperty(this, 'retry', parseInt(<string>retry));
    }

    @RequestMethodAgent
    get(url: string, data?: any, opts?: any): PromiseLike<any> {
      return requestCore({...opts, data, url});
    }

    @RequestMethodAgent
    post(url: string, body?:any, opts?: any) {
      return requestCore({...opts, body, url});
    }

    @RequestMethodAgent
    put(url: string, body?:any, opts?: any) {
      return requestCore({...opts, body, url});
    }

    @RequestMethodAgent
    patch(url: string, body?:any, opts?: any) {
      return requestCore({...opts, body, url});
    }

    @RequestMethodAgent
    delete(url: string, body?:any, opts?: any) {
      return requestCore({...opts, body, url});
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
