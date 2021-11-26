import type from '@trz/type';

type SerializeItemType = [ string, any ];

// class TypeError extends Error {
//   name = 'ParamsError';

//   constructor(message: string) {
//     super(message);

//     this.message = message;

//     const stack = this.stack?.split('\n') || [];
//     stack.splice(1, 2);
//     this.stack = stack.join('\n');
//   }
// }

const properties = new WeakMap();

export class Serialize {
  constructor(source: string) {
    const matches: string[][] = source.split('&').map((item: string) => (item.replace('=', '&').split('&')));
    properties.set(this, matches);
  }

  /** 添加一个指定的键/值对作为新的序列。 */
  append(name: string, value: any): void {
    properties.get(this).push([ name, value ]);
  }

  /** 从所有序列中删除给定的键及其相关值。 */
  delete(...names: string[]): void {
    let source: SerializeItemType[] = properties.get(this);
    for (const k of names) {
      source = source.filter(([ name ]) => name !== k);
    }
    properties.set(this, source);
  }

  /** 返回与给定序列键名相关的第一个值。 */
  get(name: string): string | null {
    return (properties.get(this).find(([ k ]: string[]) => name === k))[1];
  }

  /** 返回所有与给定序列键名相关的值。 */
  getAll(name: string): any[] {
    return properties.get(this).filter(([ k ]: SerializeItemType) => (name === k)).map(([ , v ]: SerializeItemType) => v);
  }

  /** 返回一个布尔值，表明是否存在这样的序列键名。 */
  has(name: string): boolean {
    return properties.get(this).some(([ k ]: SerializeItemType) => name === k);
  }

  /** 将与给定序列键名相关的值设置为给定值。如果有多个值，则删除其他值。 */
  set(name: string, value: any): void {
    let index, source: [ string, any ][] = properties.get(this);

    index = source.findIndex(([ k ]: [ string, any ]) => (name === k));
    source = source.filter(([ k ]: [ string, any ]) => name !== k);

    index = ~index ? Math.min(index, source.length) : source.length;

    source.splice(index, 0, [ name, value ]);

    properties.set(this, source);
  }

  keys(): string[] {
    return  properties.get(this).map(([ key ]: SerializeItemType) => (key)).entries();
  }

  values(): unknown[] {
    return properties.get(this).map(([ , value ]: SerializeItemType) => (value)).entries();
  }

  sort(): Serialize {
    const target: [ string, any ][] = properties.get(this);

    properties.set(this, target.sort(([ k1 ], [ k2 ]) => {
      return k1 < k2 ? -1 : (k1 > k2 ? 1 : 0);
    }));

    return this;
  }

  entries(): IterableIterator<[string, any]> {
    return properties.get(this).entries();
  }

  toString(): string {
    return this.stringify();
  }

  /** 返回一个包含序列字符串的字符串，适合在URL中使用。不包括问号。 */
  stringify(): string {
    return (
      properties.get(this).map(([ k, v ]: SerializeItemType) => {
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

  forEach(caller: (name: string, value: number, parent: Serialize) => void, thisArg?: any): void {
    [ ...(properties.get(this)) ].forEach(([ key, value ]: SerializeItemType): void => {
      caller.call(this, key, value, this);
    }, thisArg);
  }
}

export default Serialize;
