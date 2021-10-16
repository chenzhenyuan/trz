

const types = (any: unknown): string => {
  const ty: string = Object.prototype.toString.call(any).slice(8, -1);
  return ty.toLowerCase();
};

export const of = types;

export const is = (source: unknown, assert: string | unknown): boolean => {
  if (types(assert) !== 'string') return false;

  return types(source) === String.prototype.toLowerCase.call(assert);
};

export const isString = (s: unknown) => is(s, 'string');

export const isArray = (s: unknown) => is(s, 'array');

export const isObject = (s: unknown) => is(s, 'object');

export const isNull = (s: unknown) => is(s, 'null');

export const isBoolean = (s: unknown) => is(s, 'boolean');

export const isNumber = (s: unknown) => is(s, 'number');

export const isUndefined = (s: unknown) => is(s, 'undefined');

export default { of, is, isString, isNumber, isArray, isNull, isBoolean, isObject, isUndefined};
