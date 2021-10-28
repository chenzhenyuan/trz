

interface ResponseInterface { }



const gloHeaders = new Headers({
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-Request-Id': '****-6*****-**********',
});

const gloRequest = new Request('./', {
  method: 'GET',
  mode: 'same-origin',
  headers: gloHeaders,
  referrer: 'a',
  keepalive: false,
  signal: null,
  credentials: 'omit',
});

// export const fetchCore = (url: string, opts: any): PromiseLike<ResponseInterface> => {
//   return new Promise((resolve, reject) => {
//     fetch(new Request(url, gloRequest)).then((response) => {
//       const {
//         ok,
//         // status,
//         // statusText,
//       } = response;

//       return ok ? Promise.resolve(response) : Promise.reject(response);
//     });
//   });
// };


export const fetchCore = (...args: any[]): Promise<any> => {
  return Promise.resolve({});
}
