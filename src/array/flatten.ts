export function flatten<T>(array: T[][]): T[] {
  const result: T[] = [];

  for (const innerArray of array) {
    for (const item of innerArray) {
      result.push(item);
    }
  }

  return result;
}
