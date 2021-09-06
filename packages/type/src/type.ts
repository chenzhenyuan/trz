
const types = (any: unknown): string => {
  const ty: string = Object.prototype.toString.call(any).slice(8, -1);
  return ty.toLowerCase();
};

export const is = (source: unknown, assert: string | unknown): boolean => {
  if (types(assert) !== 'string') return false;

  return types(source) === String.prototype.toLowerCase.call(assert);
};

export const of = types;

export default { of, is };
