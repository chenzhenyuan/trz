import '../global';


const typing = (any: unknown): string => {
  // eslint-disable-next-line newline-per-chained-call
  const str = Object.prototype.toString.call(any).slice(8, -1).toLowerCase();

  // String.prototype.is = function(assert: string): boolean {
  //   return this.normalize() === String.prototype.toLowerCase.call(assert);
  // };

  // String.prototype.peer = function(assert: unknown): boolean {
  //   return this.normalize() === type(assert);
  // };

  return str;
};

export default typing;
