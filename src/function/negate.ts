export function negate<TArgs extends unknown[]>(
  fn: (...args: TArgs) => boolean,
): (...args: TArgs) => boolean {
  return (...args: TArgs): boolean => {
    return !fn(...args);
  };
}
