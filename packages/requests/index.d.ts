
interface SeriesInterface {
  [ key: string ]: string | number | boolean | SeriesInterface | SeriesInterface[] | void;
}


export type Dictionary = Record<string, string |  number | boolean | SeriesInterface | SeriesInterface[]>;

export type RequestData = string | number | FormData;


export interface RequestConfigsInterface {
  host?: string;
  retry?: number | string;
  timeout?: number | string;
  headers?: HeadersInit;
  pathname?: string;
  retryDelay?: number | string;
  withUserAuth?: boolean | "include" | "omit" | "same-origin";
  // authorization?: string;
  params?: string | Dictionary;
  body?: Dictionary | RequestData;
}

export interface RequestsInterface<T = string | RequestConfigsInterface> extends RequestConfigsInterface {
  // get response(): any

  headers: Headers

  new(options?: T)  : RequestsInterface

  setHeaders(headers: HeadersInit): void;

  get(url: string): Promise<any>;
  get(url: string, params: string | Dictionary): Promise<any>;
  get(url: string, params: string | Dictionary, options: RequestConfigsInterface): Promise<any>;

  post(url: string): Promise<any>;
  post(url: string, body: RequestData): Promise<any>;
  post(url: string, body: RequestData, options: RequestConfigsInterface): Promise<any>
}

export interface RequestsConstructor {
  new <T = {}>(T?: string | RequestConfigsInterface): RequestsInterface<T>;

  getRequestId(tpl?: string): string;
}

export const Requests: RequestsConstructor;

declare const requests: RequestsInterface;

export default requests;
