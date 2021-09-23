import 'whatwg-fetch';
import 'core-js/features/url';
import 'core-js/features/url-search-params';
import core from './core'




/** 根据传入模板，生成唯一请求ID  */
type TRequestId = (template?: string) => string;
const requestId: TRequestId = (template = 'xxxxx-xxxxx-8xxxx-xxxxx-xxxxx') => {
  return template.replace(/[xy]/g, (c) => ((Math.random() * 16) | 0).toString(16));
};

/** 请求的核心函数 */
// interface FetchCoreInterface {
//   (method: string, url: string, ...options: any[]): Promise<any>;
// }
// const core: FetchCoreInterface = (method = 'GET', url = '', ...reqOptions: any[]): Promise<any> => {
//   const [config, params, option] = reqOptions;

//   let reqConfigs = {};

//   // ----------
//   // const { domain = '', prefix = '', params = {} } = reqConfigs || {};
//   // const basicUrl = `${domain || window.location.origin}${prefix}`;
//   // const requestUrl = new URL('?ss=11#rr=22', basicUrl);
//   // const basicParams = new URLSearchParams(params); // basicParams.toString()
//   // console.log('basicParams::');
//   // return fetch(requestUrl.href, { method });

//   console.log('core', method, url, reqOptions);

//   reqConfigs = { ...config, ...{ params: params ?? {} } };

//   console.log('reqConfigs>>', url, reqConfigs);
//   return window.fetch(url, { ...reqConfigs, method });
// };

export class Fetch {
  static setConfig = (...args: any[]) => {};

  domain = '';

  prefix = '';

  credentials = 'omit';

  mode = 'cors';

  redirect = 'follow';

  referrerPolicy = 'same-origin';

  headers = {
    'x-client-name': '@trz/fetch'
  };

  params?: { [kay: string]: any } | null = null;

  body?: { [kay: string]: any } | null = null;

  get requestConfigs(): Record<string, any> {
    console.log('get requestConfigs():', this);

    return {
      domain: this.domain,
      prefix: this.prefix,
      credentials: this.credentials,
      mode: this.mode,
      redirect: this.redirect
    };
  }

  constructor(basicConfigs?: FetchConfigs) {
    console.log('basicConfigs::', basicConfigs || {});
  }

  // url: string, requestParams?: any, options?: FetchConfigs
  GET(url: string, ...options: any[]): Promise<any> {
    return core('GET', url, this.requestConfigs, ...options);
  }

  POST(url: string, ...options: any[]) {}

  PUT(url: string, ...options: any[]) {}

  UPDATE() {}

  DELETE() {}
}

export default new Fetch();
