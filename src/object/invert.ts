export function invert<T extends object>(object: T): Record<string, keyof T> {
  const result = {} as Record<string, keyof T>;

  for (const key of Object.keys(object) as Array<keyof T>) {
    const value = object[key];

    result[String(value)] = key;
  }

  return result;
}
