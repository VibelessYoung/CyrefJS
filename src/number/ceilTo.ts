export function ceilTo(value: number, decimals: number): number {
  if (Number.isNaN(value)) {
    throw new RangeError("ceilTo: value must not be NaN");
  }

  if (!Number.isInteger(decimals)) {
    throw new RangeError("ceilTo: decimals must be an integer");
  }

  if (!Number.isFinite(value)) {
    return value;
  }

  if (decimals === 0) {
    return Math.ceil(value);
  }

  const factor = 10 ** decimals;

  return Math.ceil(value * factor) / factor;
}
