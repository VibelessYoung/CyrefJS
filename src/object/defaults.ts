export function defaults<T extends object, U extends object>(
  object: T,
  source: U,
): T & Omit<U, keyof T> {
  const result = { ...object } as T & Omit<U, keyof T>;

  for (const key of Object.keys(source) as Array<keyof U>) {
    const currentValue = (result as Record<PropertyKey, unknown>)[key];

    if (currentValue === undefined) {
      (result as Record<PropertyKey, unknown>)[key] = source[key];
    }
  }

  return result;
}
