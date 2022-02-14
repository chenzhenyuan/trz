/*
 * @creator      : JAYNE·CHEN
 * @since        : 2022/01/25 15:52:49 +0800
 * @filePath     : /packages/uri/src/uri.ts
 * @lastEditors  : JAYNE·CHEN
 * @updated      : 2022/02/14 15:55:59 +0800
 * @description  : file content
 */



/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-empty-function */

import Serialize from '@trz/serialize';
import T from '@trz/type';


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


export class SearchParams extends Serialize {
  constructor(search = '') {
    // if (search.slice(0, 1) != '?') {
    //   throw new ParamsError('The params must be a search string.');
    // }
    super((typeof search === 'string' ? search : '').replace(/#.*$/i, '').replace(/^\?/i, ''));
  }

  toString(): string {
    const str = this.stringify();
    return str && `?${str}`;
  }
}


export class HashParams extends Serialize {
  constructor(hash = '') {
    // if (hash.slice(0, 1) != '#') {
    //   throw new ParamsError('The params must be a hash string.');
    // }
    super((typeof hash === 'string' ? hash : '').replace(/\?[^#]*/i, '').replace(/^#/i, ''));
  }

  toString(): string {
    const str = this.stringify();
    return str && `#${str}`;
  }
}

/**
 * @param         {array} args
 * @return        {URL}
 */
const mergeUri = (...args: Array<URL | string>): URL => {
  const argList: Array<URL | string> = Array.from(args).reverse();
  let targetUri: URL = new URL(window.location.href);

  for (const suffix of argList) {
    targetUri = new URL(suffix, targetUri);
  }

  return targetUri;
};

export class Uri extends URL {
  constructor(...args: any[]) {
    super(mergeUri(...args));
  }
  setSearch(name: any, value?: any) {
    let params = [];

    if (T.is(name, 'string') && name.length) {
      params = [[ name, value ]];
    }
    else if (T.is(name, 'object')) {
      params = Object.entries(name);
    }
    else if (T.is(name, 'array')) {
      params = <[string, any]>name;
    }
    else {
      throw TypeError('参数类型错误，请使用正确的参数。');
    }

    params.forEach(([ key, val ]) => {
      const v = val ?? '';
      this.searchParams.set(key, T.is(v, 'string') ? v: JSON.stringify(v));
    });
  }
  appendSearch(name: any, value?: any) {
    let params: string[][] = [];

    if (T.is(name, 'string') && name.length) {
      params = [[ name, value ]];
    }
    else if (T.is(name, 'object')) {
      params = Object.entries(name);
    }
    else if (T.is(name, 'array')) {
      params = <[string, any]>name;
    }
    else {
      throw TypeError('参数类型错误，请使用正确的参数。');
    }

    params.forEach(([ key, val ]) => {
      const v = val ?? '';
      this.searchParams.append(key, T.is(v, 'string') ? v: JSON.stringify(v));
    });
  }
  removeSearch(...names: string[]) {
  }
}

Object.defineProperty(Uri.prototype, Symbol.toStringTag, { value: 'Uri' });

export default Uri;
