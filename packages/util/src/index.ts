/*
 * @creator      : JAYNE·CHEN
 * @since        : 2022/01/19 16:59:56 +0800
 * @filePath     : /packages/util/src/index.ts
 * @lastEditors  : JAYNE·CHEN
 * @updated      : 2022/02/17 10:34:45 +0800
 */


import ty from '@trz/type';
import guid from './guid';

/**
 * @since 0.3.0
 */
import pathname from './pathname';

export { ty, ty as type};

export {guid, pathname};


export default { ty, type: ty, guid, Guid: guid, pathname };
