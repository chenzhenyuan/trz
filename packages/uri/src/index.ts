
import Uri from './Uri';

const parse = (url?: string): any => {
  return new Uri(url ?? window.location.href);
};

const stringify = (str?: typeof Uri): string | undefined => {
  return str?.toString();
};

export default { parse, stringify };

// 导出其他内部工具
export { SearchParams, HashParams, Uri } from './Uri';
