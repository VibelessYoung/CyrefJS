export function drop<T>(array: T[], n: number): T[] {
  if (n <= 0) {
    return array.slice();
  } else if (n >= array.length) {
    return [];
  } else {
    return array.slice(n);
  }
}
