

interface Fetch {
  GET(params: type): PromiseLike<any>;
}

declare var Fetch: {
  new(): Fetch;
  prototype: Fetch;
}


declare const wx: any;
