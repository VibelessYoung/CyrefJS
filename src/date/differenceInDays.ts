export function differenceInDays(dateLeft: Date, dateRight: Date): number {
  const left = new Date(dateLeft);
  const right = new Date(dateRight);

  left.setHours(0, 0, 0, 0);
  right.setHours(0, 0, 0, 0);

  const difference = left.getTime() - right.getTime();

  return Math.round(difference / (24 * 60 * 60 * 1000));
}
