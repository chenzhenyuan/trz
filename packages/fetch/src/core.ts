

interface ResponseInterface {}

export const fetchCore = (url: string, opts: any): PromiseLike<ResponseInterface> => {
  return fetch(opts);
};
