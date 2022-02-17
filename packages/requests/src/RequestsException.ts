/*
 * @creator      : JAYNE·CHEN
 * @since        : 2022/02/07 14:03:02 +0800
 * @filePath     : /packages/requests/src/RequestsException.ts
 * @lastEditors  : JAYNE·CHEN
 * @updated      : 2022/02/16 15:41:18 +0800
 */

import util from '@trz/util';
import * as language from './i18n';


/* 错误枚举 */
const ENUM_REQUESTS_EXCEPTION = [
  {code: 400, message: 'Bad Request',                   type: 'ERR_REQUEST_BAD_REQUEST'},
  {code: 401, message: 'Unauthorized',                  type: 'ERR_REQUEST_UNAUTHORIZED'},
  {code: 402, message: 'Payment Required',              type: 'ERR_REQUEST_PAYMENT_REQUIRED'},
  {code: 403, message: 'Forbidden',                     type: 'ERR_REQUEST_FORBIDDEN'},
  {code: 404, message: 'Not Found',                     type: 'ERR_REQUEST_NOT_FOUND'},
  {code: 405, message: 'Method Not Allowed',            type: 'ERR_REQUEST_METHOD_NOT_ALLOWED'},
  {code: 406, message: 'Not Acceptable',                type: 'ERR_REQUEST_Not_ACCEPTABLE'},
  {code: 407, message: 'Proxy Authentication Required', type: 'ERR_REQUEST_PROXY_AUTHENTICATION_REQUIRED'},
  {code: 408, message: 'Request Timeout',               type: 'ERR_REQUEST_TIMEOUT'},
  {code: 408, message: 'Conflict',                      type: 'ERR_REQUEST_TIMEOUT'},
  {code: 410, message: 'Gone',                          type: 'ERR_REQUEST_GONE'},
  {code: 415, message: 'Unsupported Media Type',        type: 'ERR_REQUEST_UNSUPPORTED_MEDIA_TYPE'},
];

const local = navigator.language.replace(/-/g, '');


const geExceptionInfo = (err: number | string | Response | Record<string, any> = '未知类型错误') => {

  const exception: any = ENUM_REQUESTS_EXCEPTION.find(({ code, type }) => {
    if (util.type.some(err, [ 'number', 'string' ])) {
      return code === err || type === err;
    }

    return code === (err as Response).status;
  });

  exception.message = language[local][exception?.type];

  return exception;
};

export class RequestsException extends Error {
  static ERR_REQUEST_TIMEOUT = 'ERR_REQUEST_TIMEOUT';

  [k: string]: any;
  code: number | string = 0;

  message = '';

  get name() {
    return 'Requests Error';
  }

  constructor(err: number | string | Response | Record<string, any> = {}) {
    super(`${geExceptionInfo(err)?.message ?? '未知类型错误'}.`);

    this.message = `${geExceptionInfo(err)?.message ?? '未知类型错误'}.`;

    Object.defineProperty(this, 'code', {
      enumerable: false,
      writable: false,
      value: (err as Response | Record<string, any>).status ?? 100,
    });


    if (err instanceof Response) {
      Object.defineProperty(this, 'detail', {
        enumerable: false,
        writable: false,
        value: err,
      });
    }
  }
}


export default RequestsException;
