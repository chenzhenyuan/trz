export type Dictionary = Record<string, any>;

export type RequestData = string | number | FormData | Dictionary;


export interface SearchParamsInterface {
  [ key: string ]: string | number | boolean | (string | number | boolean | SearchParamsInterface)[] | SearchParamsInterface;
}


export interface RequestConfigsInterface {
  host?: string;
  retry?: number | string;
  timeout?: number | string;
  headers?: HeadersInit | Dictionary;
  pathname?: string;
  retryDelay?: number | string;
  withUserAuth?: boolean | string;
}

export interface RequestsInterface<T = string | RequestConfigsInterface> extends RequestConfigsInterface {
  // get response(): any

  headers: Headers

  new(options?: T)  : RequestsInterface

  setHeaders(headers: HeadersInit): void;

  get(url: string): Promise<any>;
  get(url: string, requestSearch: SearchParamsInterface | string): Promise<any>;

  post(url: string): Promise<any>;
  post(url: string, data: RequestData): Promise<any>;
  post(url: string, options: Dictionary, data: RequestData): Promise<any>
}


export type RequestsConstructor = new <T = {}>(T?: string | RequestConfigsInterface) => RequestsInterface<T>

export const Requests: RequestsConstructor;

declare const requests: RequestsInterface;

export default requests;
