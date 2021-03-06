/*
 * @creator      : JAYNE·CHEN
 * @since        : 2022/01/19 16:59:56 +0800
 * @filePath     : /packages/requests/index.d.ts
 * @lastEditors  : JAYNE·CHEN
 * @updated      : 2022/01/25 11:01:14 +0800
 */



interface SeriesInterface {
  [ key: string ]: string | number | boolean | SeriesInterface | SeriesInterface[] | void;
}

export type HeadersInit = string[][] | Record<string, string>;

export type Dictionary = Record<string, string |  number | boolean | SeriesInterface | SeriesInterface[]>;

export type RequestData = string | number |FormData;

export type RequestBody = string | Dictionary | RequestData;

export interface RequestConfigsInterface {
  headers?: HeadersInit;
  retry?: number | string;
  retryDelay?: number | string;
  timeout?: number | string;
  host?: string;
  // pathname?: string;
  withUserAuth?: string | boolean | "include" | "omit" | "same-origin";
  params?: string | Dictionary;
  searchParams?: string | Dictionary;
  body?: string | Dictionary | RequestData;
  // authorization?: string;
}

export interface RequestsInterface<T = string | RequestConfigsInterface> extends RequestConfigsInterface {
  // get response(): any

  headers?: HeadersInit

  new(options?: T)  : RequestsInterface

  setHeaders(headers: HeadersInit): void;

  get(url: string): Promise<any>;
  get(url: string, qeurySearch: string | Dictionary): Promise<any>;
  get(url: string, qeurySearch: string | Dictionary, options: RequestConfigsInterface): Promise<any>;

  post(url: string): Promise<any>;
  post(url: string, requestBody: RequestBody): Promise<any>;
  post(url: string, requestBody: RequestBody, options: RequestConfigsInterface): Promise<any>
}

export interface RequestsConstructor {
  new <T = {}>(T?: string | RequestConfigsInterface): RequestsInterface<T>;

  getRequestId(tpl?: string): string;
}

export const Requests: RequestsConstructor;

declare const requests: RequestsInterface;

export default requests;
