export function mapKeys<T extends object, K extends PropertyKey>(
  object: T,
  iteratee: (value: T[keyof T], key: keyof T, object: T) => K,
): Record<K, T[keyof T]> {
  const result = {} as Record<K, T[keyof T]>;

  for (const key of Object.keys(object) as Array<keyof T>) {
    const newKey = iteratee(object[key], key, object);

    result[newKey] = object[key];
  }

  return result;
}
