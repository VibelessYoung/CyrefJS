export function percentage(value: number, percent: number): number {
  if (Number.isNaN(value)) {
    throw new RangeError("percentage: value must not be NaN");
  }

  if (Number.isNaN(percent)) {
    throw new RangeError("percentage: percent must not be NaN");
  }

  return (value * percent) / 100;
}
