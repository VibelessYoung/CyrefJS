export function flattenDeep<T>(array: unknown[]): T[] {
  const result: T[] = [];

  for (const item of array) {
    if (Array.isArray(item)) {
      result.push(...flattenDeep<T>(item));
    } else {
      result.push(item as T);
    }
  }

  return result;
}
