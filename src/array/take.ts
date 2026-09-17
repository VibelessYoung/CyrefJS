export function take<T>(array: T[], n: number): T[] {
  if (n <= 0) {
    return [];
  } else if (n >= array.length) {
    return array.slice();
  } else {
    return array.slice(0, n);
  }
}
