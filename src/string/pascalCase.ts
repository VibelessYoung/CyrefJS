import { tokenize } from "./internal/tokenize.js";

export function pascalCase(value: string): string {
  return tokenize(value)
    .map((word) => word[0]!.toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}
