export function curry<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => TResult,
): (...args: Partial<TArgs>) => unknown {
  const curried = (...args: unknown[]): unknown => {
    if (args.length >= fn.length) {
      return fn(...(args as TArgs));
    }

    return (...nextArgs: unknown[]) => {
      return curried(...args, ...nextArgs);
    };
  };

  return curried as (...args: Partial<TArgs>) => unknown;
}
