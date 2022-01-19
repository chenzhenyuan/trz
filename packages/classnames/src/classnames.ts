/*
 * @creator      : JAYNE·CHEN
 * @since        : 2021/09/17 12:57:26 +0800
 * @filePath     : /packages/classnames/src/classnames.ts
 * @lastEditors  : JAYNE·CHEN
 * @updated      : 2022/01/19 13:28:47 +0800
 */


import t from '@trz/type';

type ArgumentsItem = string | { [ k: string ]: boolean; };
type Arguments = Array<ArgumentsItem | ArgumentsItem[]>;


export type ClassName = ArgumentsItem | ClassName[] | { [classname : string] : ClassName};

interface ClassNamesInterface {
  (...args: Arguments): string;
}
/* ************************************************************************* */


const classnames: ClassNamesInterface = (...args) => {
  let classes: string[] = [];

  function pushClasses(cls: string): void {
    classes = classes.concat(cls.split(' '));
  }

  Array.from(args).forEach((classname: any) => {
    if (t.is(classname, 'string')) {
      pushClasses(`${classname}`);
    }
    else if (t.is(classname, 'object')) {
      for (const [ c, b ] of Object.entries(classname)) {
        if (b === true) pushClasses(c);
      }
    }
    else if (t.is(classname, 'array')) {
      pushClasses(classnames(...classname));
    }
  });

  return Array.from(new Set(classes)).join(' ').replace(/(^\s|\s$)/g, '').replace(/\s+/g, ' ');
};

export { classnames as default, classnames };
