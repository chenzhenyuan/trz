export type Dictionary = Record<string, any>;

export type RequestData = string | number | FormData;


export interface SearchParamsInterface {
  [ key: string ]: string | number | boolean | (string | number | boolean | SearchParamsInterface)[] | SearchParamsInterface;
}


export interface RequestConfigsInterface extends Dictionary {
  host?: string;
  retry?: number | string;
  timeout?: number | string;
  headers?: HeadersInit;
  pathname?: string;
  retryDelay?: number | string;
  withUserAuth?: boolean | "include" | "omit" | "same-origin";
  // authorization?: string;
  body?: any;
  params?: any;
}

export interface RequestsInterface<T = string | RequestConfigsInterface> extends RequestConfigsInterface {
  // get response(): any

  headers: Headers

  new(options?: T)  : RequestsInterface

  setHeaders(headers: HeadersInit): void;

  get(url: string): Promise<any>;
  get(url: string, params: string | SearchParamsInterface): Promise<any>;
  get(url: string, options: RequestConfigsInterface): Promise<any>;

  post(url: string): Promise<any>;
  post(url: string, body: RequestData): Promise<any>;
  post(url: string, body: RequestData, options: RequestConfigsInterface): Promise<any>
}

export interface RequestsConstructor {
  new <T = {}>(T?: string | RequestConfigsInterface): RequestsInterface<T>
  getRequestId(tpl?: string): string
}

// export type RequestsConstructor = new <T = {}>(T?: string | RequestConfigsInterface) => RequestsInterface<T>

export const Requests: RequestsConstructor;

declare const requests: RequestsInterface;

export default requests;
