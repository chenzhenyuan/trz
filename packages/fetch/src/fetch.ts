import 'whatwg-fetch';
import 'core-js/features/url';
import 'core-js/features/url-search-params';

import core from './core';
import { of, isString } from '@trz/type';

enum RequestMethodEnum {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
  UPDATE = 'UPDATE'
}
type TFetchMethodArgument = string | Record<string, any>;


class Dex {
  headers = {
    'content-type': 'sssss'
  };

  constructor() {}

  agent(cfgs: any) {
    console.log('this.agent::', cfgs);
    return core({ ...this, ...cfgs });
  }

  GET(url: TFetchMethodArgument, queryParams?: any): Promise<any> {
    const method = 'GET';

    return this.agent({
      ...(isString(url) ? { url, params: queryParams } : { ...(<Record<string, any>>url) }),
      method
    });
  }

  POST(url: TFetchMethodArgument, requestBody?: any): Promise<any> {
    const method = 'POST';

    return this.agent({
      ...(isString(url) ? { url, body: requestBody } : { ...(<Record<string, any>>url) }),
      method
    });
  }
}

export default new Dex();

const api = new Dex()
const url = 'https://api.test.shantaijk.cn/api/auth-gateway/wechatgateway/wxservice/getTicket';

api.GET(url, { x: 1, y: 2 });
api.GET(`${url}?x=1&y=2`);
api.GET({
  url: url,
  params: { x: 1, y: 2 },
  headers: {
    sfas: "asdf'",
    'content-type': 'sssss'
  }
});

api.POST(url);
