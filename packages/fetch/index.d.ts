
export type TRequestBody = string | number | FormData | Record<string, any>;


export interface SearchParamsInterface {
  [ key: string ]: string | number | boolean | (string | number | boolean | SearchParamsInterface)[] | SearchParamsInterface;
}


export interface RequestConfigsInterface {
  host?: string;
  pathname?: string;
  timeout?: number;
  withUserAuth?: boolean | string;
  headers?: HeadersInit;
  retry?: number;
  retryDelay?: number;
}

export interface NetInterface<T = RequestConfigsInterface | string> extends RequestConfigsInterface{
  // get response(): any

  headers: Headers

  new(instanceConfigs?: T): NetInterface

  setHeaders(headers: HeadersInit): void;

  get(url: string): PromiseLike<any>;
  get(url: string, searchParamse: SearchParamsInterface | string): Promise<any>;
  get(requestOptions: RequestConfigsInterface): PromiseLike<any>;

  post(url: string): Promise<any>;
  post(url: string, data: TRequestBody): Promise<any>;
  post(url: string, form: FormData): Promise<any>;
}

export type NetConstructor = new<T>(T?: RequestConfigsInterface | string) => NetInterface<T>

export declare const Network: NetInterface;

declare const net: NetInterface;

export default net;
