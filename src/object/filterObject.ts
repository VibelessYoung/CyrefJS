export function filterObject<T extends object>(
  object: T,
  predicate: (value: T[keyof T], key: keyof T, object: T) => boolean,
): Partial<T> {
  const result = {} as Partial<T>;

  for (const key of Object.keys(object) as Array<keyof T>) {
    const value = object[key];

    if (predicate(value, key, object)) {
      (result as Record<PropertyKey, unknown>)[key] = value;
    }
  }

  return result;
}
