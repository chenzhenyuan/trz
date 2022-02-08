/*
 * @creator      : JAYNE·CHEN
 * @since        : 2022/02/07 14:03:02 +0800
 * @filePath     : /packages/requests/src/RequestsError.ts
 * @lastEditors  : JAYNE·CHEN
 * @updated      : 2022/02/08 18:29:30 +0800
 */


/* 网络请求超时错误代码 */
export const ERR_REQUSST_TIMEOUT = 'ERR_REQUSST_TIMEOUT';


enum enumErrorCode {
  ERR_REQUSST_TIMEOUT = 100504,
  ERR_REQUEST_METHOD_NOT_ALLOWED = 100405
}


enum enumErrorMessage {
  ERR_REQUSST_TIMEOUT = 'the request timeout.',
  ERR_REQUEST_METHOD_NOT_ALLOWED = 'method not allowed.',
  ERR_REQUEST_BAD_REQUEST = 'bad request.'
}


export class RequestsError extends Error {
  static ERR_REQUSST_TIMEOUT: string = ERR_REQUSST_TIMEOUT;

  [k: string]: any;
  code: number | string = 0;

  message = '';

  get name() {
    return 'Requests Error';
  }
  constructor(errType: number | string) {
    super(enumErrorMessage[errType] ?? '未知类型错误');
    this.message = enumErrorMessage[errType] ?? '未知类型错误';
    this.code = enumErrorCode[errType] ?? 100000;
  }
}


export default RequestsError;
