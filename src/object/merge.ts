export function merge<T extends object, U extends object>(
  object: T,
  source: U,
): Omit<T, keyof U> & U {
  return {
    ...object,
    ...source,
  } as Omit<T, keyof U> & U;
}
