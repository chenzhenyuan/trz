
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
  if (type.is(url as string, 'string') && url as string !== '') {
    const href = decodeURIComponent(url as string);
    const [ , protocol = '', username = '', password = '', host = '', hostname = '', port = '', ] = rOrigin.exec(<string>href) ?? [];
    const [ , pathname = '', search = '', hash = '', ] = rPathname.exec(href.replace(rOrigin, '')) ?? [];

    return {
      hash, host, hostname, href,
      origin: host ? `${protocol}//${host}` : '',
      pathname, port, protocol, search, username: encodeURIComponent(username), password: encodeURIComponent(password),
    };
  }

  throw new TypeError('The parameter of Uri must be a legal value.');
};


// console.log(urlParse('//ss : pas@ss.sss.sss/sss/./ssss.js?sss=11'));


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


const properties = new WeakMap();

/**
 * 将字符串实例化Uri对象
 * @class
 * @author  ZHENYUAN·CHEN<JAYNE@CHENZHENYUAN.COM>
 */
export class Uris {
  [ k: string ]: any;

  constructor(url?: string) {
    const uri = Object.entries(urlParse(url));
    properties.set(this, uri);

    // Object.defineProperty(this, 'host', {
    //   enumerable: true, configurable: true, writable: true, value: 'afsfdsd'
    // });
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

  get host() {
    return null;
  }

  set host(value) {
    console.log(111);
    Object.defineProperty(this, 'host', {
      enumerable: true, configurable: true, writable: true, value
    });
  }
}


console.log(new URL('aa?ssss', new URL('' + window.location)));


export default URL;
