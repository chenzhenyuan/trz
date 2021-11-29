
/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-empty-function */

import type from '@trz/type';
import Serialize from '@trz/serialize';

export interface UriInterface extends Record<string, any>{
  hash?        : string;
  hashParams?  : HashParams;
  host?        : string;
  hostname?    : string;
  origin?      : string;
  password?    : string;
  pathname?    : string;
  port?        : string;
  protocol?    : string;
  search?      : string;
  searchParams?: SearchParams;
  username?    : string;
}

// const rProtocol = '((?<protocol>(^[^/]+:)(?=//))(//))?';
// const rUserInfo = '((?<username>[^:]+(?=(:|@)))(:(?<password>.+(?=@)))?@)?';
// const rHostName = '(?<hostname>([a-z0-9-]+\\.)+([a-z0-9-]+))?';
// const rPort     = '(:(?<port>\\d{1,5}))?';
// const rHost     = `((^//)?(?<host>${rHostName}${rPort}))?`;
// const rPath     = '(?<pathname>((\\.{1,2})?(/*?)[^/?#]*)+)?';
// const rSearch   = '(?<search>\\?[^#]*)?';
// const rHash     = '(?<hash>#.*$)?';
// const reg = new RegExp(`${rProtocol}${rUserInfo}${rHost}${rPath}${rSearch}${rHash}`, 'i');
// console.log(reg);


const rOrigin = /^((?:[^/]+:)(?=\/\/))?\/\/(?:([^:@]+)(?::([^@]+))?@)?(((?:[a-z0-9-]+\.)+[a-z0-9-]+)(?::(\d{1,5}))?)?/i;
const rPathname = /([^?#]+)?(\?[^#]*)?(#.*)?$/i;


const urlParse = (url?: string | UriInterface): UriInterface | never => {
  if (type.is(url, 'undefined')) {
    url = <string>window.location.href;
  }

  if (type.is(url as string, 'string') && url as string !== '') {
    const href = decodeURIComponent(url as string);
    const [ , protocol = '', username = '', password = '', host = '', hostname = '', port = '', ] = rOrigin.exec(<string>href) ?? [];
    const [ , pathname = '', search = '', hash = '', ] = rPathname.exec(href.replace(rOrigin, '')) ?? [];

    return {
      hash, host, hostname, href,
      origin: host ? `${protocol}//${host}` : '',
      password, pathname, port, protocol, search, username,
    };
  }

  throw new TypeError('The parameter must be a legal value.');
};


class ParamsError extends Error {
  name = 'ParamsError';

  constructor(message: string) {
    super(message);

    this.message = message;

    const stack = this.stack?.split('\n') || [];
    stack.splice(1, 2);
    this.stack = stack.join('\n');
  }
}

export const isUri = (source: string): boolean => {
  return rOrigin.test(source);
};

export class SearchParams extends Serialize {
  constructor(search = '') {
    if (search.slice(0, 1) != '?') {
      throw new ParamsError('The params must be a search string.');
    }

    super((typeof search === 'string' ? search : '').replace(/#.*$/i, '').replace(/^\?/i, ''));
  }

  toString(): string {
    const str = this.stringify();
    return str && `?${str}`;
  }
}

export class HashParams extends Serialize {
  constructor(hash = '') {
    if (hash.slice(0, 1) != '#') {
      throw new ParamsError('The params must be a hash string.');
    }

    super((typeof hash === 'string' ? hash : '').replace(/\?[^#]*/i, '').replace(/^#/i, ''));
  }

  toString(): string {
    const str = this.stringify();
    return str && `#${str}`;
  }
}

/**
 * 将字符串实例化Uri对象
 * @class
 * @author  ZHENYUAN·CHEN<JAYNE@CHENZHENYUAN.COM>
 */
export class Uri {
  [ k: string ]: any;

  constructor(url?: string) {
    const properties: UriInterface = urlParse(url);

    properties.hashParams = new HashParams(properties.hash || '#');
    properties.searchParams = new SearchParams(properties.search || '?');

    for (const key in properties) {
      const value = properties[key] ?? '';

      Object.defineProperty(this, key, {
        writable: false, configurable: false, enumerable: true,
        value: value,
      });
    }
  }

  toString(): string {
    return this.stringify();
  }

  stringify(): string {
    const domain = (this.host !== '' ? (this.protocol + '//' + this.host) : '');
    const search = this.searchParams.toString() === '?' ? '' : this.searchParams;
    const hash = this.hashParams.toString() === '#' ? '' : this.hashParams;

    return domain + this.pathname + search + hash;
  }
}

export default Uri;
