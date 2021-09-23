/** 根据传入模板，生成唯一请求ID  */
// type GuidInterface = (template?: string) => string;

interface GuidInterface {
  (template?: string): string
}

export const guid: GuidInterface = (template = 'xxxxx-xxxxx-8xxxx-xxxxx-xxxxx') => {
  return template.replace(/[xy]/g, (c) => ((Math.random() * 16) | 0).toString(16));
};

export default guid;
