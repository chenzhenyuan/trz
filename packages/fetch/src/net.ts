import { requestCore } from './core';
import ty from '@trz/type';
import uri from '@trz/uri';
import { pathname as path} from '@trz/util';
import { NetConstructor, RequestConfigsInterface, SearchParamsInterface } from '../index.d';




// @ts-ignores
export const Network: NetConstructor = function(this, instanceConfigs?: RequestConfigsInterface | string) {

  if (!(this instanceof Network)) {
    throw new TypeError('++++');
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
      return fnOriginCaller.call(this, url, {
        ...properties, ...opts,

        method: propertyName.toUpperCase(),

        headers: {
          ...properties.headers,
          ...opts.headers,
        },

        // body: {}
      });
    };
  };


  class Fetcher {
    [ k: string ]: any;

    constructor(cfgs: RequestConfigsInterface | string = {}) {
      let basicConfigs: RequestConfigsInterface = <RequestConfigsInterface>cfgs;


      if (ty.is(cfgs, 'string')) {
        const { origin: host, pathname } = uri.parse(<string>cfgs);
        basicConfigs = { host, pathname };
      }

      const { host, timeout, pathname } = basicConfigs;

      defineProperty(this, 'headers', basicConfigs.headers);

      if (ty.is(host, 'string') && host) {
        defineProperty(this, 'host', host);
      }

      if (ty.is(pathname, 'string') && pathname) {
        defineProperty(this, 'pathname', pathname);
      }

      if (ty.isNumber(+(<number | string>timeout)) && +(<number | string>timeout)) {
        defineProperty(this, 'timeout', +(<number | string>timeout));
      }

      // defineProperty(this, 'withUserAuth', withUserAuth);
      // defineProperty(this, 'timeout', +timeout ? +timeout : 40);
    }

    @RequestMethodAgent
    get(url: string, opts?: any): PromiseLike<any> {
      return requestCore({...opts, url});
    }

    @RequestMethodAgent
    post(url: string, opts?: any) {
      return requestCore({...opts, url});
    }
  }


  return new Fetcher(instanceConfigs);
};


export default new Network();
