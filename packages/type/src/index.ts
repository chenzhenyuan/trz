/*
 * @creator      : JAYNE·CHEN
 * @since        : 2022/01/19 15:18:11 +0800
 * @filePath     : /packages/type/src/index.ts
 * @lastEditors  : Please set LastEditors
 * @updated      : 2022/05/04 05:44:27 +0800
 * @description  : A tool for real type validate.
 */


export enum ENUM_TYPE {
  string = 'string',
  number = 'number',
  int    = 'number',
  array  = 'array',
  list   = 'array',
  object = 'object',
  dict   = 'object',
  // arraylike = 'arraylike',
}

const types = (any: unknown): string => {
  const typeName: string = Object.prototype.toString.call(any).slice(8, -1);
  return typeName.slice(0, 1).toLowerCase() + typeName.slice(1);
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

export const like = (source: unknown, mirror: unknown): boolean => {
  return types(source) === types(mirror);
};

export const isUndefined = (source: unknown): boolean => source === undefined;

export const isNull = (source: unknown): boolean => source === null;

export const isString = (source: unknown): boolean => is(source, 'string');

export const isNumber = (source: unknown): boolean => is(source, 'number');

export const isBoolean = (source: unknown): boolean => is(source, 'boolean');

export const isObject = (source: unknown): boolean => is(source, 'object');

export const isArray = (source: unknown): boolean => is(source, 'array');

export const isFunction = (source: unknown): boolean => is(source, 'function');

export const of = types;

export default {
  enum: ENUM_TYPE,
  is,
  of,
  isString, isNumber, isArray, isNull, isBoolean, isObject, isUndefined, isFunction,
  some,
};
