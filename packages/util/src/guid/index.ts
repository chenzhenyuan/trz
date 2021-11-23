/** 根据传入模板，生成唯一请求ID  */
// type GuidInterface = (template?: string) => string;

export interface GuidInterface {
  (template?: string): string;
}

export const guid: GuidInterface = (template = '*****-*****-y****-*****-*****') => {
  const r = /[xy*]/ig;

  return template.replace(r, (c) => {
    const s = c.toLowerCase();
    const b = s === 'x' ? 16 : (s === 'y' ? 10 : (s === '*' ? 36 : 0));
    return b ? ((Math.random() * b) | 0).toString(b) : c;
  });
};

export default guid;
