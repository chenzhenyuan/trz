/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/no-empty-function */

import path from "path-browserify";
import { urlParse, Serialize } from "./core";



// const parse = (url: string): Record<string, any> => reg.exec(url)?.groups ?? {};

const _NormalizeRule: any = {
  pathname: (v: string): string => path.normalize(v)
};


export class HashParams extends Serialize {
  constructor(src: string) {
    super((typeof src === 'string' ? src : '').replace(/^#/i, ''));
  }
}

export class SearchParams extends Serialize {
  constructor(src: string) {
    super((typeof src === 'string' ? src : '').replace(/^\?/i, ''));
  }
}

export class Uri {
  [ k: string ]: any;

  constructor(url?: string) {
    const $Property = urlParse(url || "");

    for (const [ key, value ] of Object.entries($Property)) {
      const fmt: any = _NormalizeRule[key] || null;
      const val = value ?? '';

      Object.defineProperty(this, key, {
        value: fmt ? fmt(val) : val,
        writable: false,
        configurable: false,
        enumerable: true,
      });
    }

    this.searchParams = new SearchParams(this.search);

    this.hashParams = new HashParams(this.hash);
  }

  toString(): string {
    return '';
  }

  stringify(): string {
    return this.toString();
  }
}




export default Uri;
