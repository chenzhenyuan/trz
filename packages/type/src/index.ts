/*
 * @creator      : JAYNE·CHEN
 * @since        : 2022/01/19 15:18:11 +0800
 * @filePath     : /packages/type/src/index.ts
 * @lastEditors  : JAYNE·CHEN
 * @updated      : 2022/01/19 15:39:24 +0800
 * @description  : A tool for real type validate.
 */


export enum ENUM_TYPE {
  int = 'number',
  array = 'array',
  list = 'array',
  number = 'number',
  string = 'string',
  arraylike = 'arraylike',
}

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

export default { enum: ENUM_TYPE, is, some, isString, isNumber, isArray, isNull, isBoolean, isObject, isUndefined };
