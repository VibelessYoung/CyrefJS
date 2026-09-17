import { tokenize } from "./internal/tokenize.js";

export function snakeCase(value: string): string {
  return tokenize(value)
    .map((word) => word.toLowerCase())
    .join("_");
}
