/*
 * @creator      : JAYNE·CHEN
 * @since        : 2022/01/19 14:59:56 +0800
 * @filePath     : /development/@trz-type.ts
 * @lastEditors  : JAYNE·CHEN
 * @updated      : 2022/01/19 15:37:59 +0800
 */


import t from '../packages/type';


console.log(t.is({0: 1, 1: 2, length: 2}, t.enum.list));
