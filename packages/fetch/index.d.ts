

export type TRequestBody = string | number | FormData | Record<string, any>;


export interface SearchParamsInterface {
  [ key: string ]: string | number | boolean | (string | number | boolean | SearchParamsInterface)[] | SearchParamsInterface;
}


export interface NetInterface {
  get response(): any

  GET(url: string): PromiseLike<any>;
  GET(url: string, searchParamse: SearchParamsInterface | string): PromiseLike<any>;

  POST(url: string): void;
  POST(url: string, form: FormData): void;
  POST(url: string, data: TRequestBody): void;

  setResponse(handler: (responseBody: any) => PromiseLike<any>): void
}


export interface NetConstructor {
  // prototype: NetInterface;
  new(instanceConfigs?: any): NetInterface;
}



export declare const Network: NetConstructor;

declare const net: NetInterface

export default net;
