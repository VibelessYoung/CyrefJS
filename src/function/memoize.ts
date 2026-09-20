export function memoize<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => TResult,
  resolver?: (...args: TArgs) => unknown,
): (...args: TArgs) => TResult {
  const cache = new Map<unknown, TResult>();

  return (...args: TArgs): TResult => {
    const key = resolver
      ? resolver(...args)
      : args.length === 1
        ? args[0]
        : JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);

    cache.set(key, result);

    return result;
  };
}
