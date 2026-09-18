import { tokenize } from "./internal/tokenize.js";

export function constantCase(value: string): string {
  return tokenize(value)
    .map((word) => word.toUpperCase())
    .join("_");
}
