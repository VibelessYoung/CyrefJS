export function unzip<T, U>(array: [T, U][]): [T[], U[]] {
  const first: T[] = [];
  const second: U[] = [];

  for (const [a, b] of array) {
    first.push(a);
    second.push(b);
  }

  return [first, second];
}
