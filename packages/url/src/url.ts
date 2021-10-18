
import Uri from "./Uri";

export const parse = (url?: string): any => new Uri(url);

export const stringify = (str?: typeof Uri): string | undefined => str?.toString();

export default {
  parse, stringify
};
