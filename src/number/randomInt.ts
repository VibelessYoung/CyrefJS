export function randomInt(min: number, max: number): number {
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    throw new RangeError("randomInt: min and max must be integers");
  }

  if (min > max) {
    throw new RangeError("randomInt: min must be less than or equal to max");
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
