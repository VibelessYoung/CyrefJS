export function roundTo(value: number, decimals: number): number {
  if (Number.isNaN(value)) {
    throw new RangeError("roundTo: value must not be NaN");
  }

  if (!Number.isInteger(decimals)) {
    throw new RangeError("roundTo: decimals must be an integer");
  }

  if (!Number.isFinite(value)) {
    return value;
  }

  if (decimals === 0) {
    return Math.round(value);
  }

  const factor = 10 ** decimals;

  return Math.round(value * factor) / factor;
}
