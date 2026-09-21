export function isPositive(value: unknown): value is number {
  return typeof value === "number" && value > 0;
}
