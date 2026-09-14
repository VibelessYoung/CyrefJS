export function keyBy<T, K extends keyof T>(
  array: T[],
  key: K,
): Record<string, T> {
  const result: Record<string, T> = {};

  for (const item of array) {
    const value = item[key];

    result[value as string] = item;
  }

  return result;
}
