// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare function typing(x: any): string;

declare interface String {
  is(assert: string): boolean;

  peer(assert: any): boolean;
}
