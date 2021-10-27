/**  pathname libs */

interface PathObjectInterface {
  dir : string;
  root: string;
  base: string;
  name: string;
  ext : string;
}


if (!(window instanceof Window) || !(window?.document instanceof Document)) {
  throw new TypeError('The runtime must be a browser.');
}


/** 断言 pathLike 参数是否为合法值，如果不合法则抛出 TypeError。 */
function pathAsserter(pathLike: any): never | void {
  if (typeof pathLike !== 'string') {
    // throw new TypeError('The "pathname" argument must be of type string. Received an instance of Object.');
    throw new TypeError('The "pathname" argument must be of type string.');
  }
}

/** 提供特定于平台的路径片段分隔符，本工具暂时只提供浏览器环境的路径分隔符 */
export const sep = '/';

/**
 * 标准化路径字符串。
 * @function
 * @name    normalize
 * @author  ZHENYUAN·CHEN<JAYNE@CHENZHENYUAN.COM>
 *
 * @param     {string}  pathname -
 * @returns   {string}  返回经过格式化后的路径字符串
 */
export const normalize = (pathLike: string): string | never => {
  pathAsserter(pathLike);

  if (pathLike.length === 0) return '.';

  pathLike = pathLike.replace((new RegExp(sep + '{2,}', 'g')), sep);

  const isAbsolute = pathLike.charCodeAt(0) === sep.charCodeAt(0);
  const segment = pathLike.split(sep).reverse();

  let subIndex = 0, rmStartIndex = -1, rmCount = 0;

  while (segment.length && subIndex < segment.length) {
    const element = segment[subIndex];

    if ((element === '..' || element === '.') && subIndex + 1 !== segment.length) {
      rmCount = rmCount + element.length;
      rmStartIndex = rmStartIndex == -1 ? subIndex : rmStartIndex;
      subIndex += 1;
      continue;
    }

    if (rmStartIndex > -1) {
      segment.splice(rmStartIndex, rmCount);
      subIndex = rmStartIndex;
      rmStartIndex = -1, rmCount = 0;
      continue;
    }

    subIndex += 1;
  }

  return segment.reverse().join(sep);
};

/**
 * 方法确定 path 是否为绝对路径。
 * @function
 * @name    isAbsolute
 * @author  ZHENYUAN·CHEN<JAYNE@CHENZHENYUAN.COM>
 *
 * @param   {PathLike} pathname - 将要被检测的地址
 * @returns {boolean}
 */
export const isAbsolute = (pathname: string): boolean | never => {
  pathAsserter(pathname);

  return pathname.length > 0 && pathname.charCodeAt(0) === 47;
};

/**
 * 返回 pathLike 的最后一部分。这里的实现与 NodeJS 中 path模块中的方法略有差异。
 * @function
 * @name    basename
 * @author  ZHENYUAN·CHEN<JAYNE@CHENZHENYUAN.COM>
 *
 * @param   {string} pathLike -
 * @param   {string} ext      -
 * @returns {string}
 */
export const basename = (pathLike: string, ext?: string): string | void | never => {
  pathAsserter(pathLike);
  const { base } = parse(pathLike);
  // const { base } = parse(pathLike.replace(/\/+$/, ''));
  if (base?.charCodeAt(0) === 46 || typeof ext !== 'string' || !ext.length) {
    return base;
  }
  return base?.replace((new RegExp(ext+'$')), '');
};

/**
 * 返回一个对象，其属性表示 path 的重要元素
 * @function
 * @name    parse
 * @author  ZHENYUAN·CHEN<JAYNE@CHENZHENYUAN.COM>
 *
 * @param   {string} pathLike
 * @returns {object}
 */
export const parse = (pathLike: string): PathObjectInterface => {
  const pathObject = { root: '', dir: '', base: '', name: '', ext: ''};

  pathAsserter(pathLike);

  if (pathLike.length === 0) return pathObject;

  const pathname = normalize(pathLike).split(sep);
  const base = pathname.splice(-1, 1).join('');

  if (pathname[0] === '') {
    pathObject.root = pathname.splice(0, 1).join(sep) + sep;
  }

  pathObject.dir = pathname.join(sep);

  pathObject.base = base;

  const lastDotIndex = base.lastIndexOf('.');

  pathObject.name = base;

  if (lastDotIndex > 0) {
    pathObject.name = base.substring(0, lastDotIndex);
    pathObject.ext = base.substr(lastDotIndex);
  }

  return pathObject;
};

/**
 * 使用特定于平台的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径
 * @function
 * @name    join
 * @author  ZHENYUAN·CHEN<JAYNE@CHENZHENYUAN.COM>
 *
 * @params  {Array<string>} ...paths  路径或路径片段的序列
 * @returns {string}
 */
export const join = (...paths: string[]): never | string => {
  let pathLike: string[] = [];

  for (const i of paths) {
    pathAsserter(i);
    pathLike = pathLike.concat(i.split(sep));
  }

  return normalize(pathLike.join(sep));
};

/**
 * 返回 path 的目录名
 * @function
 * @name    dirname
 * @author  ZHENYUAN·CHEN<JAYNE@CHENZHENYUAN.COM>
 *
 * @param   {string} pathLike -
 * @returns {string}
 */
export const dirname = (pathLike: string): never | string | void => {
  pathAsserter(pathLike);
  return parse(pathLike).dir;
};

/**
 * 返回 path 的扩展名，即 path 的最后一部分中从最后一次出现的 .（句点）字符到字符串的结尾。
 * @function
 * @name    extname
 * @author  ZHENYUAN·CHEN<JAYNE@CHENZHENYUAN.COM>
 *
 * @param   {string} pathLike     - 路径字符串
 * @returns {string}
 */
export const extname = (pathLike: string): string => {
  pathAsserter(pathLike);

  return parse(pathLike).ext;
};

/**
 * 从对象返回路径字符串。 这与 path.parse() 相反
 * @function
 * @name      format
 * @author    ZHENYUAN·CHEN<JAYNE@CHENZHENYUAN.COM>
 *
 * @param     {object}   pathObject -
 * @returns   {string}              - 路径字符串
 */
export const format = (pathObject: PathObjectInterface | Record<string, string>): string => {
  const { root = '', dir = '', base = '', name = '', ext = ''} = pathObject || {};
  return normalize([ (dir ? dir : root), (base ? base : (name + ext)) ].join(sep));
};

/**
 * 将路径或路径片段的序列解析为绝对路径。
 * @function
 * @name    resolve
 * @author  ZHENYUAN·CHEN<JAYNE@CHENZHENYUAN.COM>
 *
 * @params  {Array<string>} ...paths  路径或路径片段的序列
 * @returns {string}
 */
export const resolve = (...paths: string[]): string => {
  let rsPath: string[] = [ window.location.pathname ];

  for (const pathLike of paths) {
    if (isAbsolute(pathLike)) {
      rsPath = [ pathLike ];
      continue;
    }
    rsPath.push(pathLike);
  }

  return normalize(rsPath.join(sep));
};

/**
 * 根据当前工作目录返回从 from 到 to 的相对路径
 * @function
 * @name    relative
 * @author  ZHENYUAN·CHEN<JAYNE@CHENZHENYUAN.COM>
 *
 * @param   {string}  from  -
 * @param   {string}  to    -
 * @returns {string}
 */
const relative = (from: string, to: string): string | never => {
  throw new TypeError('Nothing to achieve');
};

/** 导出默认模块 */
export default { sep, normalize, isAbsolute, basename, parse, join, dirname, extname, format, resolve };
