import type from '@trz/type';

type ArgumentsItem = string | { [ k: string ]: boolean; };
type Arguments = Array<ArgumentsItem | ArgumentsItem[]>;

interface ClassNamesInterface {
  (...args: Arguments): string;
}
/* ************************************************************************* */

const classnames: ClassNamesInterface = (...args) => {
  let classes: string[] = [];

  function pushClasses(cls: string): void {
    classes = classes.concat(cls.split(" "));
  }

  Array.from(args).forEach((classname: any) => {
    if (type.is(classname, "string")) {
      pushClasses(`${classname}`);
    }
    else if (type.is(classname, "object")) {
      for (const [ c, b ] of Object.entries(classname)) {
        if (b === true) pushClasses(c);
      }
    }
    else if (type.is(classname, "array")) {
      pushClasses(classnames(...classname));
    }
  });

  return Array.from(new Set(classes)).join(" ")
    .replace(/\s+/g, " ");
};

export { classnames as default, classnames };
