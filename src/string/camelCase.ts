import { tokenize } from "./internal/tokenize.js";

export function camelCase(value: string): string {
  const words = tokenize(value);

  if (words.length === 0) {
    return "";
  }

  const [firstWord, ...remainingWords] = words;

  return (
    firstWord!.toLowerCase() +
    remainingWords
      .map((word) => word[0]!.toUpperCase() + word.slice(1).toLowerCase())
      .join("")
  );
}
