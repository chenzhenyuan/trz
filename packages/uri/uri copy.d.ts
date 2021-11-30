import Serialize from '@trz/serialize';
export interface UriInterface extends Record<string, any> {
    hash?: string;
    hashParams?: HashParams;
    host?: string;
    hostname?: string;
    origin?: string;
    password?: string;
    pathname?: string;
    port?: string;
    protocol?: string;
    search?: string;
    searchParams?: SearchParams;
    username?: string;
}
export declare const isUri: (source: string) => boolean;
export declare class SearchParams extends Serialize {
    constructor(search?: string);
    toString(): string;
}
export declare class HashParams extends Serialize {
    constructor(hash?: string);
    toString(): string;
}
export declare class Uris {
    [k: string]: any;
    constructor(url?: string);
    toString(): string;
    stringify(): string;
    get host(): null;
    set host(value: null);
}
export default URL;
