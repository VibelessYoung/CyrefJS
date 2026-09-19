export function once<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => TResult,
): (...args: TArgs) => TResult {
  let called = false;
  let result: TResult;

  return (...args: TArgs): TResult => {
    if (!called) {
      result = fn(...args);
      called = true;
    }

    return result;
  };
}
