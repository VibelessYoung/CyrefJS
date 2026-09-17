export function difference<T>(array: T[], values: T[]): T[] {
  const result: T[] = [];

  for (const item of array) {
    if (!values.includes(item)) {
      result.push(item);
    }
  }

  return result;
}
