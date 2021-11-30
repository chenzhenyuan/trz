

const types = (any: unknown): string => {
  const ty: string = Object.prototype.toString.call(any).slice(8, -1);
  return ty.toLowerCase();
};


export const is = (source: unknown, assert: string | unknown): boolean => {
  if (types(assert) !== 'string') return false;

  return types(source) === String.prototype.toLowerCase.call(assert);
};

export const some = (source: unknown, ...typeList: string[]): boolean => {
  return Array.from(typeList).includes(types(source));
};

export const isString = (source: unknown): boolean => is(source, 'string');

export const isArray = (source: unknown): boolean => is(source, 'array');

export const isObject = (source: unknown): boolean => is(source, 'object');

export const isNull = (source: unknown): boolean => is(source, 'null');

export const isBoolean = (source: unknown): boolean => is(source, 'boolean');

export const isNumber = (source: unknown): boolean => is(source, 'number');

export const isUndefined = (source: unknown): boolean => is(source, 'undefined');

export const of = types;

export default {
  of,
  is,
  some,
  isString,
  isNumber,
  isArray,
  isNull,
  isBoolean,
  isObject,
  isUndefined
};
