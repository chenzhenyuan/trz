import { fetchCore } from './core';
import ty from '@trz/type';
import uri from '@trz/uri';
import { pathname as path} from '@trz/util';
import { NetConstructor, RequestConfigsInterface, SearchParamsInterface } from '../index.d';
import { relative } from 'path/posix';


function defineProperty(o: any, propertyKey: string, attributes: PropertyDescriptor & ThisType<any>): void {
  Object.defineProperty(o, propertyKey, {
    value: attributes, writable: false, enumerable: true, configurable: false
  });
}


// @ts-ignores
export const Network: NetConstructor = function(instanceConfigs?: RequestConfigsInterface | string) {
  let properties: any;


  // const fetchRequest = function (ins: any, name: string, descriptor: any) {
  //   const _RquestMethod = descriptor.value;
  //   descriptor.value = function (url: string, opts?: SearchParamsInterface): typeof _RquestMethod {
  //     const targetUrl = properties?.domain + path.join(properties?.pathname ?? '.', url);
  //     const req = new Request(targetUrl, { "method": name, referrer: "." });
  //     return _RquestMethod.call(this, uri.parse(req.url).pathname, req);
  //   };
  // }
  //
  //
  // const fetchResponse = function (ins: any, name: string, descriptor: any) {
  //   const _RquestMethod = descriptor.value;
  //   descriptor.value = async function (url: string, opts?: any) {
  //     const handler = (rsp: any) => {
  //       return /\/json/ig.test(rsp.headers.get('Content-type')) ? rsp.json() : rsp.text();
  //     }
  //     return (
  //       _RquestMethod.call(this, url, opts).then(handler)
  //     );
  //   }
  // }



  class Networker {
    [ k: string ]: any;

    get response() {
      return properties.response;
    }

    constructor(basicConfigs?: RequestConfigsInterface | string) {
      properties = {};

      if (ty.is(basicConfigs, 'string')) {
        const {
          origin: domain,
          pathname
        } = uri.parse(<string>basicConfigs);

        basicConfigs = { domain, pathname };
      }

      const { domain, pathname } = <any>basicConfigs ?? {};

      if (ty.is(domain, 'string') && domain) {
        defineProperty(this, 'domain', properties.domain = domain);
      }

      if (ty.is(pathname, 'string')) {
        defineProperty(this, 'pathname', properties.pathname = pathname);
      }
    }


    GET(url: string, opts?: any): PromiseLike<any> {
      return fetchCore(url, opts);
    }


    // @fetchRequest
    POST(url: string, opts?: any) {
      return fetchCore(url, opts);
    }


    setResponse(responseHandler: () => PromiseLike<any>) {
      if (ty.is(responseHandler, 'function') === false && responseHandler !== null ) {
        throw new TypeError(`The 'responseHandler' param must be a funciton.`);
      }

      properties.respHandler = responseHandler;
    }
  }


  return new Networker(instanceConfigs);
};


export default new Network();



