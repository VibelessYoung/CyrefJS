export function set<T extends object, K extends keyof T>(
  object: T,
  key: K,
  value: T[K],
): T {
  const result = { ...object };

  result[key] = value;

  return result;
}
