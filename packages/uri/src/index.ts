
import Uri from './Uri';

export const parse = (url?: string): any => new Uri(url ?? window.location.href);

export const stringify = (str?: typeof Uri): string | undefined => str?.toString();

export default { parse, stringify };

export { default as pathname } from './pathname';

export { SearchParams, HashParams } from './Uri';


