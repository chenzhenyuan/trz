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
declare class Serialize {
    [k: string]: any;
    constructor(source: string);
    toString(): string;
    stringify(): string;
    set(key: string, value: any): void;
    delete(...keys: string[]): void;
}
export declare const isUri: (source: string) => boolean;
export declare class SearchParams extends Serialize {
    constructor(search?: string);
    stringify(): string;
}
export declare class HashParams extends Serialize {
    constructor(hash?: string);
    stringify(): string;
}
export declare class Uri {
    [k: string]: any;
    constructor(url?: string);
    toString(): string;
    stringify(): string;
}
export default Uri;
