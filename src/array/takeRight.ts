export function takeRight<T>(array: T[], n: number): T[] {
  if (n <= 0) {
    return [];
  } else if (n >= array.length) {
    return array.slice();
  } else {
    return array.slice(array.length - n);
  }
}
