export declare class Serialize {
    constructor(source: string);
    append(name: string, value: any): void;
    delete(...names: string[]): void;
    get(name: string): string | null;
    getAll(name: string): any[];
    has(name: string): boolean;
    set(name: string, value: any): void;
    keys(): string[];
    values(): unknown[];
    sort(): Serialize;
    entries(): IterableIterator<[string, any]>;
    toString(): string;
    stringify(): string;
    forEach(caller: (name: string, value: number, parent: Serialize) => void, thisArg?: any): void;
}
export default Serialize;
