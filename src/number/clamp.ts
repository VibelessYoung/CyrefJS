export function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) {
    throw new RangeError("clamp: value must not be NaN");
  }

  if (Number.isNaN(min) || Number.isNaN(max)) {
    throw new RangeError("clamp: min and max must not be NaN");
  }

  if (min > max) {
    throw new RangeError("clamp: min must be less than or equal to max");
  }

  return Math.min(Math.max(value, min), max);
}
