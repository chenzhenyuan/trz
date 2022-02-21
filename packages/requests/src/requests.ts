// import T from '@trz/type';
import Uri  from '@trz/uri/src/uri';
import util from '@trz/util/src';
import { RequestsConstructor, RequestOptions as RequestOptionsInterface } from '../index.d';
import { DEFAULT_TIMEOUT, mergeHeaders, requestCore } from './core';
import merge from 'lodash.merge';


const DEFAULT_REQUEST_ID = '****-*****-*****-****';


// class TypeError extends Error {
//   constructor(message?: string) {
//     super(message);
//     this.name = 'TypeError';
//     const stack = this.stack?.split('\n');
//     stack?.splice(1, 1);
//     this.stack = stack?.join('\n');
//   }
// }


// @ts-ignores
const ReqConstructor: RequestsConstructor = function(this: any, instanceConfigs?: RequestOptionsInterface | RequestOptionsInterface['host']) {

  if (!(this instanceof ReqConstructor)) {
    throw new TypeError('Cannot call a class as a function.');
  }

  /* 私有属性 */
  const properties: RequestOptionsInterface & { [ p: string ]: any; } = {};

  // util
  function defineProperty(main: any, propertyKey: string, attributes: any): void {
    if (attributes === undefined) return;

    properties[propertyKey] = attributes;

    Object.defineProperty(main, propertyKey, {
      writable: false, enumerable: true, configurable: false,
      value: attributes
    });
  }

  /** 修饰器 */
  const RequestMethodAgent = (o: unknown, propertyName: string, descriptor: any) => {
    const fnOriginCaller = descriptor.value;

    descriptor.value = function(url: string, data?: any, opts?: Record<string, any>): typeof fnOriginCaller {
      const method = propertyName.toUpperCase();
      opts = { ...(opts ?? { method }) };

      const headers: Record<string, any> = mergeHeaders(properties?.headers ?? {}, opts?.headers ?? {});

      const options: any = { ...(merge({}, properties, opts)), headers, method };

      if (method === 'GET') {
        data = merge({}, data, options?.searchParams);
      }

      return fnOriginCaller.call(this, url, data, options);
    };
  };

  class Requests {
    [ k: string ]: any;

    constructor(cfgs: RequestOptionsInterface | RequestOptionsInterface['host'] = {}) {
      let basicConfigs: RequestOptionsInterface = <RequestOptionsInterface>cfgs;

      if (util.type.is(cfgs, 'string')) {
        basicConfigs = { host: new Uri(<string>cfgs).toString()};
      }

      const { host, headers, withUserAuth, timeout/* , retry, retryDelay */ } = basicConfigs;

      defineProperty(this, 'host', new Uri(util.type.is(host, 'string') ? host : '.').toString());
      defineProperty(this, 'headers', headers);
      defineProperty(this, 'withUserAuth', util.type.some(withUserAuth, [ 'boolean', 'string' ]) ? withUserAuth : false);
      defineProperty(this, 'timeout', isNaN(+(timeout as Pick<RequestOptionsInterface, 'timeout'>)) ? DEFAULT_TIMEOUT : timeout);

      if (basicConfigs.hasOwnProperty('searchParams')) {
        defineProperty(this, 'searchParams', basicConfigs.searchParams);
      }

      if (basicConfigs.hasOwnProperty('body')) {
        defineProperty(this, 'body', basicConfigs.body);
      }
    }

    @RequestMethodAgent
    get(url: string, searchParams?: any, opts?: any): PromiseLike<any> {
      return requestCore({...opts, searchParams, url});
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
  }

  return new Requests(instanceConfigs);
};


ReqConstructor.getRequestId = (tpl = DEFAULT_REQUEST_ID): string => util.Guid(tpl);


export { ReqConstructor as Requests };


export default new ReqConstructor({});
