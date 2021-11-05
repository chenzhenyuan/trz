
/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-empty-function */

import { urlParse, Serialize } from './core';

export class UriHashParams extends Serialize {
  constructor(src: string) {
    super((typeof src === 'string' ? src : '').replace(/^#/i, ''));
  }
}

export class UriSearchParams extends Serialize {
  constructor(src: string) {
    super((typeof src === 'string' ? src : '').replace(/^\?/i, ''));
  }
}

/**
 * 将传入的字符串 实例化 Uri
 * @class
 * @author  ZHENYUAN·CHEN<JAYNE@CHENZHENYUAN.COM>
 */
export class Uri {
  [ k: string ]: any;

  constructor(url?: string) {
    const property = urlParse(<string>url || window.location.href);

    property.origin = '';

    if (property.host) {
      property.origin = `${property.protocol || ''}//${property.host}`;
    }

    property.searchParams = new UriSearchParams(property.search);
    property.hashParams = new UriHashParams(property.hash);

    for (const key in property) {
      const value = property[key] ?? '';

      Object.defineProperty(this, key, {
        value: value,
        writable: false,
        configurable: false,
        enumerable: true,
      });
    }
  }

  toString(): string {
    return this.stringify();
  }

  stringify(): string {
    const users = `${this.username}${this.username ? ':' : ''}${this.password}${this.username || this.password ? '@' : ''}`;
    return `${this.protocol}//${users}${this.host}${this.pathname}${this.search}${this.hash}`;
  }
}

export default Uri;
