declare type ArgumentsItem = string | {
    [k: string]: boolean;
};
declare type Arguments = Array<ArgumentsItem | ArgumentsItem[]>;
interface ClassNamesInterface {
    (...args: Arguments): string;
}
declare const classnames: ClassNamesInterface;
export { classnames as default, classnames };
//# sourceMappingURL=classnames.d.ts.map