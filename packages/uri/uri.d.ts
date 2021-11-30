import Serialize from '@trz/serialize';
export declare class SearchParams extends Serialize {
    constructor(search?: string);
    toString(): string;
}
export declare class HashParams extends Serialize {
    constructor(hash?: string);
    toString(): string;
}
export declare class Uri extends URL {
    constructor(...args: any[]);
    setSearch(name: any, value?: any): void;
    appendSearch(name: any, value?: any): void;
    removeSearch(...names: string[]): void;
}
export default Uri;
