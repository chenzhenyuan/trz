/**
 * 静态方法：Uri.path
 */


interface PathObjectInterface {
  dir? : string;
  root?: string;
  base?: string;
  name?: string;
  ext? : string;
}

if (!(window instanceof Window) || !(window?.document instanceof window?.Document)) {
  throw new TypeError('The running environment must be a browser.');
}


function pathAsserter(pathLike: any): never | void {
  if (typeof pathLike !== 'string') {
    // throw new TypeError('The "pathname" argument must be of type string. Received an instance of Object.');
    throw new TypeError('The "pathname" argument must be of type string.');
  }
}



export const format = (pathObject: PathObjectInterface): string => '';


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


export const extname = (): string => '';













export const sep = "/";


/**
 * @name normalize
 * @author  ZHENYUAN·CHEN<JAYNE@CHENZHENYUAN.COM>
 * @description 标准化路径字符串。
 *
 * @param     {string}  pathname
 * @returns   {string}  返回经过格式化后的路径字符串
 */
export const normalize = (pathLike: string): string | never => {
  pathAsserter(pathLike);

  if (pathLike.length === 0) return '.';

  pathLike = pathLike.replace(/\/+/g, '/');

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
 * @description 返回 path 的最后一部分。这里的实现与 NodeJS 中 path模块中个的方法略有差异。
 * @param     {string} pathLike -
 * @param     {string} ext      -
 * @returns   {string}
 */
export const basename = (pathLike: string, ext?: string): string | void | never => {
  pathAsserter(pathLike);
  const { base } = parse(pathLike);
  if (base?.charCodeAt(0) === 46 || typeof ext !== 'string' || !ext.length) {
    return base;
  }
  return base?.replace((new RegExp(ext+'$')), '');
};


/**
 * @name  parse
 * @author  ZHENYUAN·CHEN<JAYNE@CHENZHENYUAN.COM>
 * @description 返回一个对象，其属性表示 path 的重要元素
 *
 * @param   {string} pathLike
 * @returns {object}
 */
export const parse = (pathLike: string): PathObjectInterface => {
  const pathObject = { root: "", dir: "", base: "", name: "", ext: ""};

  pathAsserter(pathLike);

  if (pathLike.length === 0) return pathObject;

  const pathname = normalize(pathLike).split('/');
  const base = pathname.splice(-1, 1).join('');

  if (pathname[0] === '') {
    pathObject.root = pathname.splice(0, 1).join('/') + '/';
  }

  pathObject.dir = pathname.join('/');

  pathObject.base = base;

  const lastDotIndex = base.lastIndexOf('.');

  pathObject.name = base.substring(0, lastDotIndex);

  pathObject.ext = base.substr(lastDotIndex);

  return pathObject;
};


/**
 * @description 使用特定于平台的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径
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
 * @description 返回 path 的目录名
 * @param   {string} pathLike -
 * @returns
 */
export const dirname = (pathLike: string): never | string | void => {
  pathAsserter(pathLike);
  return parse(pathLike).dir;
};


export default { sep, normalize, isAbsolute, basename, parse, join, dirname};
