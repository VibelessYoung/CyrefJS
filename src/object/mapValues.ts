export function mapValues<T extends object, R>(
  object: T,
  iteratee: (value: T[keyof T], key: keyof T, object: T) => R,
): { [K in keyof T]: R } {
  const result = {} as { [K in keyof T]: R };

  for (const key of Object.keys(object) as Array<keyof T>) {
    result[key] = iteratee(object[key], key, object);
  }

  return result;
}
