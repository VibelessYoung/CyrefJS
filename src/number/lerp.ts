export function lerp(start: number, end: number, t: number): number {
  if (Number.isNaN(start)) {
    throw new RangeError("lerp: start must not be NaN");
  }

  if (Number.isNaN(end)) {
    throw new RangeError("lerp: end must not be NaN");
  }

  if (Number.isNaN(t)) {
    throw new RangeError("lerp: t must not be NaN");
  }

  return start + (end - start) * t;
}
