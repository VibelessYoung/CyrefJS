export function partial<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => TResult,
  ...partialArgs: unknown[]
): (...remainingArgs: unknown[]) => TResult {
  return (...remainingArgs: unknown[]): TResult => {
    return fn(...(partialArgs.concat(remainingArgs) as TArgs));
  };
}
