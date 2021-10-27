import { fetchCore } from './core';
import T from '@trz/type'

import { Network as NetConstructor, SearchParamsInterface } from '../index.d';


// const fetchCore = ({ url }: any = {}): PromiseLike<ResponseInterface> => {
//   return new Promise((resolve, reject) => {
//     fetch(url, {});
//   });
// };


/**
 * @decorator
 */
const ResponseAgent = function (...args: any[]) {
}


/**
 * @decorator
 */
const RequestBefore = function (reqConfigs = {}) {
  return function (ins: any, name: string, descriptor: any) {
    const _RquestMethod = descriptor.value;

    const req = new Request('aaaa', { "method": name });

    descriptor.value = function (url: string, params?: SearchParamsInterface): typeof _RquestMethod {
      return _RquestMethod.call(this, req.url, req);
    }
  }
}

// @ts-ignore
export const Network: NetConstructor = function(instanceConfigs) {
  let properties: any;

  class Network {
    [ k: string ]: any;

    get response() {
      return properties.response;
    }

    constructor(basicConfigs?: any) {
      const { pathname } = <any>basicConfigs;

      properties = {};

      if (T.is(pathname, 'string')) {
        properties.pathname = pathname;
        Object.defineProperty(this, 'pathname', { value: pathname, enumerable: true, writable: false, configurable: false });
      }
    }

    // @ResponseAgent
    @RequestBefore(properties)
    GET(url: string, opts?: any): PromiseLike<any> {
      console.log('GET:url', url, opts);
      return fetchCore(url, opts);
    }

    @RequestBefore(properties)
    POST(url: string | unknown, opts?: unknown) {
      console.log('POST:url', url, opts);
    }


    setResponse(respHandler: () => PromiseLike<any>) {
      properties.respHandler = respHandler;
    }
  }


  return new Network(instanceConfigs);
};


export default new Network('aaaaa');



