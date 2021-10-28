import { fetchCore } from './core';
import t from '@trz/type';
import uri from '@trz/uri';
import { pathname as path} from '@trz/util';
import { NetConstructor, RequestConfigsInterface, SearchParamsInterface } from '../index.d';


function defineProperty(o: any, propertyKey: string, attributes: PropertyDescriptor & ThisType<any>): void {
  Object.defineProperty(o, propertyKey, {
    value: attributes, writable: false, enumerable: true, configurable: false
  });
}


// @ts-ignores
export const Network: NetConstructor = function(instanceConfigs?: RequestConfigsInterface | string) {
  let properties: any;

  /**
   * @decorator
   */
  const fetchRequest = function (ins: any, name: string, descriptor: any) {
    const _RquestMethod = descriptor.value;

    descriptor.value = function (url: string, opts?: SearchParamsInterface): typeof _RquestMethod {
      const targetUrl = properties?.domain + path.join(properties?.pathname ?? '.', url);
      const req = new Request(targetUrl, { "method": name, referrer: "." });

      return _RquestMethod.call(this, uri.parse(req.url).pathname, req);
    };
  }

  /**
   * @decorator
   */
  const fetchResponse = function (ins: any, name: string, descriptor: any) {
    const _RquestMethod = descriptor.value;

    descriptor.value = async function (url: string, opts?: any) {
      return (
        _RquestMethod.call(this, url, opts).then((rsp: any) => {
          if (+rsp.status < 400) {
            const headers = rsp.headers;
            console.log(headers.get('Content-type'));
            return rsp;
          };

          return Promise.reject({ ...rsp });
        }).then(() => {

        })
      );
    }
  }

  class Networker {
    [ k: string ]: any;

    get response() {
      return properties.response;
    }

    constructor(basicConfigs?: string | RequestConfigsInterface) {
      properties = {};

      if (t.is(basicConfigs, 'string')) {
        const { origin: domain, pathname } = uri.parse(<string>basicConfigs);
        basicConfigs = { domain, pathname };
      }

      const { domain, pathname } = <any>basicConfigs ?? {};

      if (t.is(domain, 'string') && domain) {
        defineProperty(this, 'domain', properties.domain = domain);
      }

      if (t.is(pathname, 'string')) {
        defineProperty(this, 'pathname', properties.pathname = pathname);
      }
    }

    @fetchRequest
    @fetchResponse
    GET(url: string, opts?: any): PromiseLike<any> {
      return fetchCore(url, opts);
    }


    // @fetchRequest
    POST(url: string, opts?: any) {
      return fetchCore(url, opts);
    }

    setResponse(responseHandler: () => PromiseLike<any>) {
      if (t.is(responseHandler, 'function') === false && responseHandler !== null ) {
        throw new TypeError(`The 'responseHandler' param must be a funciton.`);
      }

      properties.respHandler = responseHandler;
    }
  }

  return new Networker(instanceConfigs);
};


export default new Network();



