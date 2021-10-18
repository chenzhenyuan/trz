
import Uri from "./Uri";

import * as path from './pathname';

export const parse = (url?: string): any => new Uri(url);

export const stringify = (str?: typeof Uri): string | undefined => str?.toString();

export default { parse, stringify };


const target = '../a/b/c/d/./../../../C1/C2/../s/./';
console.group(target);
console.log(path.normalize(target));
console.groupEnd();
