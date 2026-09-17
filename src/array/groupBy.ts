export function groupBy<T, K extends keyof T>(
  array: T[],
  key: K,
): Record<string, T[]> {
  const result: Record<string, T[]> = {};

  for (const item of array) {
    const group = item[key];

    if (!result[group as string]) {
      result[group as string] = [];
    }

    result[group as string]!.push(item);
  }

  return result;
}
