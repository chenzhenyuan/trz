import { fetchCore } from './core';
import t from '@trz/type'

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




// @ts-ignore
export const Network: NetConstructor = function(instanceConfigs) {
  let properties: any;


/**
 * @decorator
 */
  const RequestBefore = function (ins: any, name: string, descriptor: any) {
    const _RquestMethod = descriptor.value;

    descriptor.value = function (url: string, params?: SearchParamsInterface): typeof _RquestMethod {

      console.log(properties);

      const req = new Request(properties.pathname, { "method": name });
      return _RquestMethod.call(this, url, req);
    };
  }

  class Networks {
    [ k: string ]: any;

    get response() {
      return properties.response;
    }

    constructor(basicConfigs?: any) {
      const { pathname } = <any>basicConfigs;

      properties = {};

      if (t.is(pathname, 'string')) {
        properties.pathname = pathname;
        Object.defineProperty(this, 'pathname', { value: properties.pathname, writable: false, enumerable: true, configurable: false });
      }
    }

    // @ResponseAgent
    @RequestBefore
    GET(url: string, opts?: any): PromiseLike<any> {
      console.log('GET:url', url, opts);
      return fetchCore(url, opts);
    }

    @RequestBefore
    POST(url: string | unknown, opts?: unknown) {
      console.log('POST:url', url, opts);
    }

    setResponse(respHandler: () => PromiseLike<any>) {
      properties.respHandler = respHandler;
    }
  }

  return new Networks(instanceConfigs);
};


export default new Network('aaaaa');



