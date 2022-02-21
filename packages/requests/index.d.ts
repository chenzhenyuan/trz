/*
 * @creator      : JAYNE·CHEN
 * @since        : 2022/01/19 16:59:56 +0800
 * @filePath     : /packages/requests/index.d.ts
 * @lastEditors  : JAYNE·CHEN
 * @updated      : 2022/02/21 11:30:52 +0800
 */

interface SeriesInterface {
  [ key: string ]: string | number | boolean | SeriesInterface | SeriesInterface[] | void;
}

export type Dictionary = Record<string, string |  number | boolean | SeriesInterface | SeriesInterface[]>;

export type RequestData = string | number | FormData | Dictionary;

export type RequestBody = string | RequestData | null;

export type Headers = Record<string, string> | string[][];

export interface RequestOptions {
  host?: string;
  headers?: Record<string, string> | string[][];
  withUserAuth?: boolean | "include" | "omit" | "same-origin";
  timeout?: number | string;
  searchParams?: string | Dictionary;
  body?: string | RequestData;
  // retry?: number | string;
  // retryDelay?: number | string;
  // authorization?: string;
}

export interface RequestsInterface<T = string | RequestOptions> extends RequestOptions {
  // get response(): any

  headers?: Headers

  new(options?: T)  : RequestsInterface

  setHeaders(headers: Headers): void;

  get(url: string): Promise<any>;
  get(url: string, searchParams: string | Dictionary): Promise<any>;
  get(url: string, searchParams: string | Dictionary, options: RequestOptions): Promise<any>;

  post(url: string): Promise<any>;
  post(url: string, requestBody: RequestBody): Promise<any>;
  post(url: string, requestBody: RequestBody, options: RequestOptions): Promise<any>

  put(url: string): Promise<any>;
  put(url: string, requestBody: RequestBody): Promise<any>;
  put(url: string, requestBody: RequestBody, options: RequestOptions): Promise<any>
}

export interface RequestsConstructor {
  new <T = {}>(T?: RequestOptions['host'] | RequestOptions): RequestsInterface<T>;

  getRequestId(tpl?: string): string;
}

export const Requests: RequestsConstructor;

declare const requests: RequestsInterface;

export default requests;
