export function zip<T, U>(array1: T[], array2: U[]): [T, U][] {
  const result: [T, U][] = [];

  for (let i = 0; i < Math.min(array1.length, array2.length); i++) {
    result.push([array1[i]!, array2[i]!]);
  }

  return result;
}
