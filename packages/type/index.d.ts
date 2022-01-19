export declare enum ENUM_TYPE {
    int = "number",
    array = "array",
    list = "array",
    number = "number",
    string = "string",
    arraylike = "arraylike"
}
export declare const is: (source: unknown, assert: string | unknown) => boolean;
export declare const some: (source: unknown, assertList: string[]) => boolean;
export declare const isUndefined: (source: unknown) => boolean;
export declare const isNull: (source: unknown) => boolean;
export declare const isString: (source: unknown) => boolean;
export declare const isNumber: (source: unknown) => boolean;
export declare const isBoolean: (source: unknown) => boolean;
export declare const isObject: (source: unknown) => boolean;
export declare const isArray: (source: unknown) => boolean;
export declare const of: (any: unknown) => string;
declare const _default: {
    enum: typeof ENUM_TYPE;
    is: (source: unknown, assert: unknown) => boolean;
    some: (source: unknown, assertList: string[]) => boolean;
    isString: (source: unknown) => boolean;
    isNumber: (source: unknown) => boolean;
    isArray: (source: unknown) => boolean;
    isNull: (source: unknown) => boolean;
    isBoolean: (source: unknown) => boolean;
    isObject: (source: unknown) => boolean;
    isUndefined: (source: unknown) => boolean;
};
export default _default;
