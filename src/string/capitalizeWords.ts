export function capitalizeWords(value: string): string {
  return value
    .split(" ")
    .map((word) => {
      if (word.length === 0) return word;

      return word[0]!.toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}
