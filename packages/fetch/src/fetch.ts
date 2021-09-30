import core from './core';
import { isString } from '@trz/type';

enum RequestMethodEnum { GET='GET', PUT='PUT', POST='POST', DELETE='DELETE', UPDATE='UPDATE' }

console.log(RequestMethodEnum);

type TFetchMethodArgument = string | Record<string, any>;

class Fetch {
  headers = {};

  constructor() {
    // do something
    this;
  }

  agent(cfgs: any) {
    console.log('this.agent::', cfgs);
    return core({ ...this, ...cfgs });
  }

  GET(url: TFetchMethodArgument, queryParams?: any): Promise<any> {
    const method = 'GET';

    return this.agent({
      ...(isString(url) ? { url, params: queryParams ?? {} } : { ...(<Record<string, any>>url) }),
      method
    });
  }

  POST(url: TFetchMethodArgument, requestBody?: any): Promise<any> {
    const method = 'POST';

    return this.agent({
      ...(isString(url) ? { url, body: requestBody ?? null } : { ...(<Record<string, any>>url) }),
      method
    });
  }
}

export default new Fetch();

const api = new Fetch();
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
