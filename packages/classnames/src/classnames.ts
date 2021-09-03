type ArgumentsItem = string | {[k: string]: boolean};
type Arguments = Array<ArgumentsItem | ArgumentsItem[]>;

interface ClassNamesInterface {
  (...args: Arguments): string;
}
/* ************************************************************************* */

const is = (source: any, targetTypeName?: string): string | boolean => {
  const sourceTypeName = Object.prototype.toString.call(source).slice(8, -1).toLowerCase();
  return targetTypeName ? sourceTypeName === targetTypeName : sourceTypeName;
};

const classnames: ClassNamesInterface = (...args) => {
  let classes: string[] = [];

  function pushClasses(cls: string): void {
    classes = classes.concat(cls.split(" "));
  }

  Array.from(args).forEach((classname: any) => {
    if (is(classname, "string")) {
      pushClasses(`${classname}`);
    }
    else if (is(classname, "object")) {
      for (const [c, b] of Object.entries(classname)) {
        if (b === true) pushClasses(c);
      }
    }
    else if (is(classname, "array")) {
      pushClasses(classnames(...classname));
    }
  });

  return Array.from(new Set(classes)).join(" ").replace(/\s+/g, " ");
};

export { classnames as default, classnames };
