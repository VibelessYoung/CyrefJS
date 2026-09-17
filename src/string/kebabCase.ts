import { tokenize } from "./internal/tokenize.js";

export function kebabCase(value: string): string {
  return tokenize(value)
    .map((word) => word.toLowerCase())
    .join("-");
}
