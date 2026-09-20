export function throttle<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  delay: number,
): (...args: TArgs) => void {
  let lastExecution: number | undefined;

  return (...args: TArgs): void => {
    const now = Date.now();

    if (lastExecution !== undefined && now - lastExecution < delay) {
      return;
    }

    lastExecution = now;

    fn(...args);
  };
}
