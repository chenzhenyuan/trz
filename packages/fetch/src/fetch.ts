import core from './core';
import { isObject, isString } from '@trz/type';

enum RequestMethodEnum {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE'
}

type TFetchMethodArgument = string | Record<string, any>;



export const parseUrl = (domain: string): string => {
  /**
   * protocol =>
   * (\/\/(?:(?:)(?=@)@)?(([a-z0-9-]+\.?)+(?::(\d{1,5}))?))
   */
  //               |protocol|      username |   :|   password   |@ | host name |
  const rDomain = /^([^:]+:)?\/\/(?:([^:\s]+)(?::([^@\s]+))?(?=@)@)(((?:\.?[a-z0-9-]+)+)(?::(\d{1,5})(?=(?:\/|\b)))?)((?:\/[^?#]+)+)?(\?[^#]+)?(#.+)?/i;

  if (!isString(domain)) return window.location.origin;

  const [
    href,
    protocol = window.location.protocol,
    username = '',
    password = '',
    host = '',
    hostname = '',
    port = '',
    pathname = '',
    search = '',
    hash = '',
    ...rest
  ] = (domain.match(rDomain) || []);

  console.log(domain.match(rDomain));
  console.log("parseUrlDomain::", {
    href,
    protocol, username, password, host, hostname, port,
    pathname, search, hash
  });

  return '';
};


console.log(new URL('https://userInf0:11o@host:123//path/as.ddd?query#fragment'));

parseUrl('sftp://USERNAME:PASSWORD@domain.com.cn:12311/path/as.ddd?query#fragment//ssss');

class Network {
  [ k: symbol | string ]: any;

  constructor(itcConfigs?: any) {
    const {
      queryParams: urlSearchParams = null,
      body = null,
      domain = '',
      basicPath = '',
      headers = null
    } = itcConfigs || {};

    this.headers = {};
    console.log('创建了一个新的实例：', itcConfigs);
  }

  // #headers = {
  //   'x-request-client-name': '@trz/fetch',
  //   'x-request-client-version': '1.0.0'
  // };

  private agent(cfgs: any) {
    console.log('this.agent::', cfgs);

    return core({
      ...this,
      ...cfgs,
      headers: {
        ...this.headers,
        ...cfgs.headers,
        'x-request-uid': Date.now()
      }
    });
  }

  public GET(url: TFetchMethodArgument, params?: any): Promise<any> {
    const reqOptions = isString(url)
      ? { url, urlSearchParams: params ? params : null }
      : { ...(<Record<string, any>>url) };

    return this.agent({ ...reqOptions, method: 'GET' });
  }

  public POST(url: TFetchMethodArgument, requestBody?: any): Promise<any> {
    const reqOptions = isString(url)
      ? { url, body: requestBody ? requestBody : null }
      : { ...(<Record<string, any>>url) };

    return this.agent({ ...reqOptions, method: 'POST' });
  }

  // public headers(headers?: HeadersInit | string, headerValue?: string) {
  //   if (headers && headerValue) {
  //     this.#headers = { ...this.#headers, [<string>headers]: headerValue };
  //   }
  //   else if (headers) {
  //     this.#headers = { ...this.#headers, ...(<HeadersInit>headers) };
  //   }
  //   return this;
  // }

  public urlSearchParams(queryParams?: string | any) {
    if (isObject(queryParams)) {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;
    }
  }
}

/* ------------------------------------------------------------------------- */
export default new Network({});

const url = '/mock/xmen';

const api = new Network({
  urlSearchParams: 'a=1',
  headers: { 'x-request-client': 'fetch/1.0.0' }
});

// api.headers('aaa', "bbb");



// console.log('API Instance', api);
// api.GET(url, { x: 1, y: 2 });
// api.GET(`${url}?x=1&y=2`);
// api.GET({ url: url, params: { x: 1, y: 2 }, headers: { 'content-type': 'sssss' } });

// api.POST(url, new FormData()).then((resp) => {
//   console.log(resp);
// });
