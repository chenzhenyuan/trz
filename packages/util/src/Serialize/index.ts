import type from '@trz/type';
import cor from 'core-js';


class TypeError extends Error {
  name = 'ParamsError';

  constructor(message: string) {
    super(message);

    this.message = message;

    const stack = this.stack?.split('\n') || [];
    stack.splice(1, 2);
    this.stack = stack.join('\n');
  }
}


const stringify = (o: unknown): string | never => {
  if (!o || !type.is(o, 'object')) {
    throw new TypeError('The input type must be object like.');
  }

  return Object.entries(<{[s: string]: unknown;} | ArrayLike<unknown>>o).map((arr) => (arr.join('='))).join('&');
};

const properties = new WeakMap();

export class Serialize {
  [ k: string ]: any;

  static stringify = stringify;

  constructor(source: string) {
    const matches: string[][] = source.split('&').map((item: string) => (item.replace('=', '&').split('&')));
    properties.set(this, matches);
  }

  toString(): string {
    return this.stringify();
  }

  stringify(): string {
    return (
      properties.get(this).map(([ k, v ]: [ string, any ]) => {
        if (type.is(v, 'undefined')) {
          return k;
        }

        if (type.is(v, 'null')) {
          return k+'=';
        }

        if (type.is(v, 'string') || type.is(v, 'number') || type.is(v, 'boolean') || type.is(v, 'null')) {
          return [ k, v ].join('=');
        }

        return k + '=' + JSON.stringify(v);
      }).join('&')
    );
  }

  getAll(key: string): any[] {
    return properties.get(this).filter(([ k ]: string) => (key === k)).map(([ , v ]: any[]) => v);
  }

  get(key: string): string {
    return (properties.get(this).find(([ k ]: string[]) => key === k))[1];
  }

  set(key: string, value: any): void {
    let index, source: [ string, any ][] = properties.get(this);

    index = source.findIndex(([ k ]: [ string, any ]) => (key === k));
    source = source.filter(([ k ]: [ string, any ]) => key !== k);

    index = Math.max(Math.min(index, source.length), 0);
    source.splice(index, 0, [ key, value ]);

    properties.set(this, source);
  }

  delete(...keys: string[]): void {
    let target: string[][] = properties.get(this);
    for (const k of keys) {
      target = target.filter(([ key ]) => key !== k);
    }
    properties.set(this, target);
  }

  keys(): string[] {
    return  properties.get(this).map(([ key ]: string[]) => (key));
  }

  values(): unknown[] {
    return properties.get(this).map(([ , value ]: string[]) => (value));
  }

  has(key: string): boolean {
    return properties.get(this).some(([ k ]: string[]) => k === key);
  }

  append(key: string, value: any): void {
    properties.get(this).push([ key, value ]);
  }

  sort() {
    const target: [ string, any ][] = properties.get(this);

    properties.set(this, target.sort(([ k1 ], [ k2 ]) => {
      return k1 < k2 ? -1 : (k1 > k2 ? 1 : 0);
    }));
  }

  entries() {
    return properties.get(this);
  }
}


