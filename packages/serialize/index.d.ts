export declare class Serialize {
    [k: string]: any;
    constructor(source: string);
    append(name: string, value: any): void;
    delete(...names: string[]): void;
    get(name: string): string | null;
    getAll(name: string): any[];
    has(name: string): boolean;
    set(name: string, value: any): void;
    keys(): string[];
    values(): unknown[];
    sort(): void;
    entries(): any;
    toString(): string;
    stringify(): string;
    forEach(caller: (value: string, key: number, parent: Serialize) => void, thisArg?: any): void;
}
export default Serialize;
