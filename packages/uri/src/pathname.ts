


interface PathObjectInterface {
  dir? : string;
  root?: string;
  base?: string;
  name?: string;
  ext? : string;
}


if (!(window instanceof Window && window.document instanceof Document)) {
  throw new TypeError("****");
}


function pathAsserter(pathname: any): never | void {
  if (typeof pathname !== 'string') {
    // throw new TypeError('The "pathname" argument must be of type string. Received an instance of Object.');
    throw new TypeError('The "pathname" argument must be of type string.');
  }
}



export const sep = "/";

export const basename = (...args: any[]): string => '';

export const format = (pathObject: PathObjectInterface): string => '';

export const extname = (): string => '';

export const dirname = (): string => '';


/**
 * @description 使用特定于平台的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径
 *
 * @params  {Array<string>} ...paths  路径或路径片段的序列
 * @returns {string}
 */
export const join = (...paths: string[]): string => '';


/**
 * @description 将路径或路径片段的序列解析为绝对路径
 *
 * @params  {Array<string>} ...paths  路径或路径片段的序列
 * @returns {string}
 */
export const resolve = (...paths: string[]): string => '';


/**
 * @description 根据当前工作目录返回从 from 到 to 的相对路径
 *
 * @param       {string}  from  -
 * @param       {string}  to    -
 * @returns     {string}
 */
export const relative = (from: string, to: string): string => '';


/**
 * @description 返回一个对象，其属性表示 path 的重要元素
 *
 * @param   {string} path
 * @returns {object}
 */
export const parse = (path: string): PathObjectInterface => {
  pathAsserter(path);

  return {};
};


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
 * @returns   {string}  返回经过格式化后的路径字符串
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


export default {
  sep,
  normalize,
  isAbsolute,
};
