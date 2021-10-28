

export type TRequestBody = string | number | FormData | Record<string, any>;


export interface SearchParamsInterface {
  [ key: string ]: string | number | boolean | (string | number | boolean | SearchParamsInterface)[] | SearchParamsInterface;
}


export interface RequestConfigsInterface {
  domain?: string;
  pathname?: string;
}

export interface NetInterface<T = RequestConfigsInterface | string> {
  get response(): any

  new(instanceConfigs?: T): NetInterface

  GET(url: string): PromiseLike<any>;
  GET(url: string, searchParamse: SearchParamsInterface | string): PromiseLike<any>;

  POST(url: string): void;
  POST(url: string, form: FormData): void;
  POST(url: string, data: TRequestBody): void;

  setResponse(handler: null | ((responseBody: any) => PromiseLike<any>)): void;
}

// export interface NetConstructor {
//   // prototype: NetInterface;
//   new<T>(instanceConfigs?: string | RequestConfigsInterface): NetInterface;
// }

export type NetConstructor = new<T>(T?: RequestConfigsInterface | string) => NetInterface<T>

export declare const Network: NetInterface;

declare const net: NetInterface;

export default net;
