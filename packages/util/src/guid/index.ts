/** 根据传入模板，生成唯一请求ID  */
// type GuidInterface = (template?: string) => string;

export interface GuidInterface {
  (template?: string): string;
}

export const guid: GuidInterface = (template = 'xxxxx-xxxxx-yxxxx-xxxxx-xxxxx') => {
  const r = /[xy*]/g;

  return template.replace(r, (c) => {
    const b = c === 'x' ? 16 : (c === 'y' ? 10 : (c === '*' ? 32 : 1));
    return ((Math.random() * b) | 0).toString(b);
  });
};

export default guid;
