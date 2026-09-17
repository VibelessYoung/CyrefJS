export function dropRight<T>(array: T[], n: number): T[] {
  if (n <= 0) {
    return array.slice();
  } else if (n >= array.length) {
    return [];
  } else {
    return array.slice(0, array.length - n);
  }
}
