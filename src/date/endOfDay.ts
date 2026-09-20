export function endOfDay(date: Date): Date {
  const result = new Date(date);

  result.setHours(23, 59, 59, 999);

  return result;
}
