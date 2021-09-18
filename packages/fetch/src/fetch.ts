
import 'whatwg-fetch';
import { RequestConfigs, RequestCoreInterface } from "./fetch.types";


const core: RequestCoreInterface = ({ url, ...reqConfigs}: RequestConfigs) => {
  return fetch(url, reqConfigs);
}


class Fetch {
  static setConfig = (...args: any[]) => {
  }

  headers = new Headers();

  domain = "";

  preUri = "";

  credentials = "omit";

  mode = "cors";

  redirect = "follow";

  referrerPolicy = "same-origin"

  constructor(requestConfigs?: RequestConfigs) {
  }

  GET() {
    return core({ method: "GET" });
  }

  POST() { }

  PUT() { }

  UPDATE() { }

  DELETE() { }
}

export { Fetch };

export default new Fetch({  });


// "Accept": "*/*",
// "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_2 like Mac OS X) > AppleWebKit/537.51.2 (KHTML, like Gecko) miniprogram/8.0.10 Mobile/11D257   MicroMessenger/8.0.18(oaaa12312) NetType/WIFI",
// // "Via": "",
// "X-Mobile-ApplicationName": "com.chenzhenyuan.wapp",
