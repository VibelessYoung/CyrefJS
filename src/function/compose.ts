export function compose<T>(
  ...functions: Array<(value: T) => T>
): (value: T) => T {
  return (value: T): T => {
    return functions.reduceRight((result, fn) => fn(result), value);
  };
}
