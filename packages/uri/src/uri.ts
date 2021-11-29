
/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-empty-function */
import type from '@trz/type';
import Serialize from '@trz/serialize';

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


const uriParser = (...args: any): URL | string => {
  let url = new URL(window.location.toString());

  args = Array.from(args);

  for (const element of args) {
    url = new URL(element, url);
  }

  return url;
};


export class Uri extends URL {
  constructor(...args: any[]) {
    super(uriParser(...args));
  }

  setSearch(name: any, value?: any) {
    let params = [];

    if (type.is(name, 'string')) {
      params = [[ name, value ]];
    }
    else if (type.is(name, 'object')) {
      params = Object.entries(name);
    }
    else if (type.is(name, 'array')) {
      params = <[string, any]>name;
    }
    else {
      throw TypeError('参数类型错误，请使用正确的参数。');
    }

    params.forEach(([ k, v ]) => {
      console.log([ k, v ]);
      this.searchParams.set(k, JSON.stringify(v));
    });
  }

  appendSearch(name: any, value?: any) {
    let params: string[][] = [];

    if (type.is(name, 'string')) {
      params = [[ name, value ]];
    }
    else if (type.is(name, 'object')) {
      params = Object.entries(name);
    }
    else if (type.is(name, 'array')) {
      params = <[string, any]>name;
    }
    else {
      throw TypeError('参数类型错误，请使用正确的参数。');
    }

    params.forEach(([ k, v ]) => {
      console.log([ k, v ]);
      this.searchParams.append(k, JSON.stringify(v));
    });
  }

  removeSearch(...names: string[]) {
  }
}

Object.defineProperty(
  Uri.prototype,
  Symbol.toStringTag, { value: 'Uri' }
);

export default Uri;
