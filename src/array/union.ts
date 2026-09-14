export function union<T>(array: T[], values: T[]): T[] {
  return [...new Set([...array, ...values])];
}
