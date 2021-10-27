

interface ResponseInterface {}

export const fetchCore = ({ url }: any = {}, ...args: any[]): PromiseLike<ResponseInterface> => {
  return new Promise((resolve, reject) => {
    fetch(url, {});
  });
};
