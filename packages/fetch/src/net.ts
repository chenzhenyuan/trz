
interface NetInterface {
  GET(url: string): PromiseLike<any>;

  GET(url: string, searchParamse: string): PromiseLike<any>;
}

interface NetConstructor {
  new(instanceConfigs?: any): NetInterface;
}


const netCore = ({ url }: any = {}) => {
  console.log(url);

  return new Promise((resolve, reject) => {
    resolve({});
  });
};


// @ts-ignore
export const Net: NetConstructor = function(instanceConfigs): NetInterface {
  const property: any = {};

  const reqAgent = () => netCore({});

  class Request {
    [ k: string ]: any;

    get n() {
      return property.n;
    }

    constructor(n) {
      property.n = n;
    }

    GET(url: string) {
      console.log(property);
      return reqAgent();
    }
  }

  return new Request(instanceConfigs);
};

export default new Net('aaaaa');



