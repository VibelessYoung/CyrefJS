export function get<T extends object, K extends keyof T>(
  object: T,
  path: K,
  defaultValue?: T[K],
): T[K] | undefined {
  const value = object[path];

  return value ?? defaultValue;
}
