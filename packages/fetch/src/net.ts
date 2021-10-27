
interface FetchInterface {
  GET(url: string): PromiseLike<any>;

  GET(url: string, searchParamse: string): PromiseLike<any>;
}

interface FetchConstructor {
  new(instanceConfigs?: any): FetchInterface;
}


const fetchCore = ({ url }: any = {}) => {
  console.log(url);

  return new Promise((resolve, reject) => {
    resolve({});
  });
};


// @ts-ignore
export const Fetch: FetchConstructor = function(...args) {
  const property: any = {};

  const fetchAgent = () => fetchCore({});

  class Fetch {
    [ k: string ]: any;

    constructor() {
      property.n = 'aaa';
    }

    GET(url: string) {
      return fetchAgent();
    }
  }


  return new Fetch();
};

export default new Fetch();



