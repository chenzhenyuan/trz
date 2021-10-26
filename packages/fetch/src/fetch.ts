import core from './core';
import pathname from '@trz/util/lib/pathname';
import { isObject, isString } from '@trz/type';

type TFetchMethodArgument = Record<string, any> | string;

enum RequestMethodEnum { GET = 'GET', PUT = 'PUT', POST = 'POST', DELETE = 'DELETE', UPDATE = 'UPDATE' }


function Fetch(this: unknown, { domain = '', pathname = '' }: any = {}): unknown {
  if (!(this instanceof Fetch)) {
    throw new TypeError('Cannot call a class as a function.');
  }

  const property = {};

  const reqAgent = function({ method, url, headers = {}, ...reqConfigs }: any = {}) {
    return core({ method, url, ...reqConfigs });
  };

  class Request {
    [ k: symbol | string ]: any;

    constructor(initConfigs?: string | Record<string, any>) {
      console.log(initConfigs);
    }

    public test(): void {
      console.log(domain);
    }

    public GET(url: TFetchMethodArgument, params?: unknown): Promise<any> {
      const reqOptions = (
        isString(url) ? { url, params: params ? params : null } : <Record<string, any>>url
      );

      return reqAgent({ ...reqOptions, method: 'GET' });
    }

    public POST(url: TFetchMethodArgument, requestBody?: unknown): Promise<any> {
      const reqOptions = (
        isString(url) ? { url, body: requestBody ? requestBody : null } : <Record<string, any>>url
      );

      return reqAgent({ ...reqOptions, method: 'POST' });
    }
  }

  return new Request();
}


/* ------------------------------------------------------------------------- */
export default new Fetch();

export { Fetch };
