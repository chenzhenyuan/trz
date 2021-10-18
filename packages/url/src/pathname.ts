


this === window ? 'browser' : 'node';


if (!(window instanceof Window && window.document instanceof Document)) {
  throw new TypeError("****");
}


function pathAsserter<pathname>(pathname: any): never | void {
  if (typeof pathname !== 'string') {
    // throw new TypeError('The "pathname" argument must be of type string. Received an instance of Object.');
    throw new TypeError('The "pathname" argument must be of type string.');
  }
}


export const sep = "/";


export const join = (): string => '';


export const basename = (...args: any[]): string => '';


export const extname = (): string => '';


export const dirname = (): string => '';


export const resolve = (): string => '';

/**
 * @description path.isAbsolute() 方法确定 path 是否为绝对路径。
 *
 * @param     {PathLike} pathname    将要被检测的地址
 * @returns   {boolean}
 */
export const isAbsolute = (pathname: string): boolean | never => {
  pathAsserter(pathname);

  return pathname.length > 0 && pathname.charCodeAt(0) === 47;
};


/**
 * @name path.normalize
 * @author  ZHENYUAN·CHEN<JAYNE#CHENZHENYUAN.COM>
 * @description 标准化路径字符串。
 *
 * @param     {string}  pathname
 * @returns   {string}  ...
 */
export const normalize = (pathname: string): string | never => {
  pathAsserter(pathname);

  if (pathname.length === 0) return '.';

  const isAbsolute = pathname.charCodeAt(0) === 47;
  const fragment = pathname.split(sep).reverse();

  let iCurrent = 0, rmStartIndex = -1, rmCount = 0;

  while (fragment.length && iCurrent < fragment.length) {
    const fragItem = fragment[iCurrent];

    if (fragItem === '..' || fragItem === '.') {
      rmCount = rmCount + fragItem.length;
      rmStartIndex = rmStartIndex == -1 ? iCurrent : rmStartIndex;

      iCurrent += 1;

      if (rmStartIndex + 1 != fragment.length) {
        continue;
      }
    }

    if (rmStartIndex > -1) {
      fragment.splice(rmStartIndex, rmCount);
      iCurrent = rmStartIndex;
      rmStartIndex = -1, rmCount = 0;
      continue;
    }

    iCurrent += 1;
  }

  return `${isAbsolute ? '/' : './'}${fragment.reverse().join(sep)}`;
};
