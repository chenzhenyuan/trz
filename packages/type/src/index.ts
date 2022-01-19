/*
 * @since        : 2021/10/24 16:27:12 +0800
 * @description  : file content
 * @filePath     : /packages/type/src/type.ts
 * @updated      : 2022/01/19 11:42:39 +0800
 * @lastEditors  : JAYNE·CHEN
 * @creator      : JAYNE·CHEN
 */


const types = (any: unknown): string => {
  const ty: string = Object.prototype.toString.call(any).slice(8, -1);
  return ty.toLowerCase();
};


export const is = (source: unknown, assert: string | unknown): boolean => {
  if (types(assert) !== 'string') {
    return false;
  }

  return types(source) === String.prototype.toLowerCase.call(assert);
};

export const some = (source: unknown, assertList: string[]): boolean => (
  Array.isArray(assertList) && assertList.some((assert: string) => (
    types(source) === String.prototype.toLowerCase.call(assert)
  ))
);

export const isUndefined = (source: unknown): boolean => source === undefined;

export const isNull = (source: unknown): boolean => source === null;

export const isString = (source: unknown): boolean => is(source, 'string');

export const isNumber = (source: unknown): boolean => is(source, 'number');

export const isBoolean = (source: unknown): boolean => is(source, 'boolean');

export const isObject = (source: unknown): boolean => is(source, 'object');

export const isArray = (source: unknown): boolean => is(source, 'array');

export const of = types;

export default { of, is, some, isString, isNumber, isArray, isNull, isBoolean, isObject, isUndefined };
