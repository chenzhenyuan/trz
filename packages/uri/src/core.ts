/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-empty-function */


const rProtocol = "^(?<protocol>[^/]+\\:(?=//))?(//)?";
const rUserInfo = "((?<username>[^:]+(?=(\\:|@)))(\\:(?<password>.+(?=@)))?@)?";
const rHostName = "(?<hostname>(?:\\.?[a-z0-9-]+)+)?";
const rPort     = "(:(?<port>\\d{1,5}))?";
const rHost     = `(?<host>${rHostName}${rPort}(?=/))?`;
const rPath     = "(?<pathname>((\\.{1,2})?(/{0,})?[^/?#]*)+)?";
const rSearch   = "(?<search>\\?[^#]+)?";
const rHash     = "(?<hash>#.+)?";

const reg = new RegExp(`${rProtocol}${rUserInfo}${rHost}${rPath}${rSearch}${rHash}`, 'i');


export const urlParse = (url: string): Record<string, any> => {
  if (typeof url !== 'string')
    return {};

  return reg.exec(url ?? window.location.href)?.groups ?? {};
};


export class Serialize {
  [ k: string ]: any;

  constructor(src: string) {
    for (const [ key, ...value ] of (src.match(/([^=&]+(?:=[^&]+)?)/g) ?? []).map((i) => i.split(/=/i))) {
      Object.defineProperty(this, key, {
        enumerable: true,
        set: function(v: string) { },
        get: function() {
          return value.join('=');
        }
      });
    }
  }

  toString(): string {
    return Object.entries(this).map(([ k, v ]) => (k + '='+v)).join('=');
  }

  stringify(): string {
    return this.toString();
  }

  append(n: string, v: unknown): void { }

  delete(n: string): void {
    delete this[n];
  }
}

export default { urlParse, Serialize };
