export function floorTo(value: number, decimals: number): number {
  if (Number.isNaN(value)) {
    throw new RangeError("floorTo: value must not be NaN");
  }

  if (!Number.isInteger(decimals)) {
    throw new RangeError("floorTo: decimals must be an integer");
  }

  if (!Number.isFinite(value)) {
    return value;
  }

  if (decimals === 0) {
    return Math.floor(value);
  }

  const factor = 10 ** decimals;

  return Math.floor(value * factor) / factor;
}
