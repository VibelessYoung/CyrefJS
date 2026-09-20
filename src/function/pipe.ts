export function pipe<T>(...functions: Array<(value: T) => T>): (value: T) => T {
  return (value: T): T => {
    return functions.reduce((result, fn) => fn(result), value);
  };
}
